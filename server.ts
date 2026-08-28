import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory & persisted JSON storage
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  phone1: string;
  phone2?: string;
  address: string;
  productName: string;
  productQuantity: string;
  amount: string;
  whenToReceive: string;
  status: "Pending" | "Contacted" | "Delivered" | "Cancelled";
  syncedToGoogleSheet: boolean;
  syncError?: string;
}

interface Config {
  googleSheetWebhookUrl: string;
  whatsappNumber: string;
}

let leads: Lead[] = [];
let config: Config = {
  googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbxldXAliza3i3mgA4XueP6vhWLTHCXLHc2Z43Dwr_2JDd_9tv35RiCbBTmQ1NZf5QwS/exec",
  whatsappNumber: "08068515242",
};

// Load saved data
try {
  if (fs.existsSync(LEADS_FILE)) {
    leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
  }
  if (fs.existsSync(CONFIG_FILE)) {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  }
} catch (e) {
  console.error("Error loading persisted data:", e);
}

function saveLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save leads:", e);
  }
}

function saveConfig() {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save config:", e);
  }
}

// Function to forward lead to Google Apps Script Webhook
async function forwardToGoogleSheets(lead: Lead, webhookUrl: string) {
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return { success: false, error: "No valid Google Sheet Webhook URL configured" };
  }

  try {
    // Google Apps Script requires redirect follow and JSON POST
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: lead.id,
        createdAt: new Date(lead.createdAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
        name: lead.name,
        email: lead.email || "",
        phone1: lead.phone1,
        phone2: lead.phone2 || "",
        address: lead.address,
        productName: lead.productName,
        productQuantity: lead.productQuantity,
        amount: lead.amount,
        whenToReceive: lead.whenToReceive,
      }),
      redirect: "follow",
    });

    const text = await response.text();

    // Check if Google returned an HTML login or permission denied page
    if (text.includes("You need access") || text.includes("accounts.google.com") || text.includes("drive-logo") || text.includes("permission")) {
      return {
        success: false,
        error: "ACCESS DENIED BY GOOGLE: In your Google Apps Script, click Deploy > New deployment, set 'Who has access' to 'Anyone', and deploy.",
      };
    }

    try {
      const parsed = JSON.parse(text);
      if (parsed.result === "error") {
        return { success: false, error: parsed.error || "Google Sheet script returned an error" };
      }
    } catch (e) {
      // Ignore JSON parse error if text was plain success response
    }

    return { success: true, responseText: text };
  } catch (err: any) {
    console.error("Error forwarding to Google Sheet Webhook:", err);
    return { success: false, error: err.message || "Network error forwarding to Google Sheet" };
  }
}

// API Routes
app.get("/api/config", (req, res) => {
  res.json(config);
});

app.post("/api/config", (req, res) => {
  const { googleSheetWebhookUrl, whatsappNumber } = req.body;
  if (typeof googleSheetWebhookUrl === "string") {
    config.googleSheetWebhookUrl = googleSheetWebhookUrl.trim();
  }
  if (typeof whatsappNumber === "string") {
    config.whatsappNumber = whatsappNumber.trim();
  }
  saveConfig();
  res.json({ status: "ok", config });
});

app.get("/api/leads", (req, res) => {
  res.json(leads);
});

app.post("/api/leads", async (req, res) => {
  try {
    const { orderId, orderDate, name, email, phone1, phone2, address, productName, productQuantity, amount, whenToReceive } = req.body;

    if (!name || !phone1 || !address || !productName) {
      return res.status(400).json({ error: "Missing required fields (Name, Phone 1, Address, Product Name)" });
    }

    const newLead: Lead = {
      id: orderId && typeof orderId === "string" ? orderId.trim() : "ORD-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email ? email.trim() : "",
      phone1: phone1.trim(),
      phone2: phone2 ? phone2.trim() : "",
      address: address.trim(),
      productName: productName.trim(),
      productQuantity: productQuantity || "1 Unit",
      amount: amount || "N30,000",
      whenToReceive: whenToReceive || "As soon as possible",
      status: "Pending",
      syncedToGoogleSheet: false,
    };

    // Try syncing to Google Sheet if Webhook URL is set
    if (config.googleSheetWebhookUrl) {
      const syncResult = await forwardToGoogleSheets(newLead, config.googleSheetWebhookUrl);
      if (syncResult.success) {
        newLead.syncedToGoogleSheet = true;
      } else {
        newLead.syncedToGoogleSheet = false;
        newLead.syncError = syncResult.error;
      }
    }

    leads.unshift(newLead);
    saveLeads();

    // Generate WhatsApp direct URL
    // Format phone for international WhatsApp: 08068515242 -> 2348068515242
    let waPhone = config.whatsappNumber.replace(/\D/g, "");
    if (waPhone.startsWith("0")) {
      waPhone = "234" + waPhone.slice(1);
    }

    const waText = `Hello! I just placed an order on your website for the Multi-Function Solar Transistor Radio:

📦 *ORDER DETAILS (#${newLead.id})*
👤 *Name:* ${newLead.name}
${newLead.email ? `✉️ *Email:* ${newLead.email}\n` : ""}📞 *Phone 1:* ${newLead.phone1}
${newLead.phone2 ? `📞 *Phone 2:* ${newLead.phone2}\n` : ""}📍 *Address:* ${newLead.address}
📻 *Product:* ${newLead.productName}
🔢 *Quantity:* ${newLead.productQuantity}
💰 *Amount:* ${newLead.amount}
📅 *When to receive:* ${newLead.whenToReceive}

Please confirm my order and dispatch details. Thank you!`;

    const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

    res.json({
      success: true,
      lead: newLead,
      whatsappUrl,
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Failed to process lead order" });
  }
});

app.post("/api/leads/resync", async (req, res) => {
  const { id } = req.body;
  const lead = leads.find((l) => l.id === id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });

  if (!config.googleSheetWebhookUrl) {
    return res.status(400).json({ error: "Google Sheet Webhook URL not configured" });
  }

  const syncResult = await forwardToGoogleSheets(lead, config.googleSheetWebhookUrl);
  if (syncResult.success) {
    lead.syncedToGoogleSheet = true;
    delete lead.syncError;
  } else {
    lead.syncedToGoogleSheet = false;
    lead.syncError = syncResult.error;
  }
  saveLeads();
  res.json({ success: lead.syncedToGoogleSheet, lead, syncResult });
});

app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const lead = leads.find((l) => l.id === id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });

  if (status) lead.status = status;
  saveLeads();
  res.json({ success: true, lead });
});

app.delete("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  leads = leads.filter((l) => l.id !== id);
  saveLeads();
  res.json({ success: true });
});

app.post("/api/test-webhook", async (req, res) => {
  const { webhookUrl } = req.body;
  const testLead: Lead = {
    id: "TEST-001",
    createdAt: new Date().toISOString(),
    name: "Test Customer",
    phone1: "08012345678",
    phone2: "08087654321",
    address: "123 Test Street, Ikeja, Lagos",
    productName: "Multi-Function Solar Transistor Radio",
    productQuantity: "1 Unit",
    amount: "N30,000",
    whenToReceive: "Tomorrow",
    status: "Pending",
    syncedToGoogleSheet: false,
  };

  const result = await forwardToGoogleSheets(testLead, webhookUrl);
  res.json(result);
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
