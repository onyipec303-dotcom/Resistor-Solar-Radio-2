import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CustomerPhotoSection } from './components/CustomerPhotoSection';
import { FeatureHighlights } from './components/FeatureHighlights';
import { PricingOffers } from './components/PricingOffers';
import { OrderForm } from './components/OrderForm';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { GoogleSheetGuideModal } from './components/GoogleSheetGuideModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { Footer } from './components/Footer';
import { OrderFormInputs, LeadOrder, AppConfig } from './types';

export default function App() {
  const [selectedQuantity, setSelectedQuantity] = useState<'1 Unit' | '2 Units'>('1 Unit');
  const [selectedAmount, setSelectedAmount] = useState<'N30,000' | 'N55,000'>('N30,000');
  
  const [leads, setLeads] = useState<LeadOrder[]>([]);
  const [config, setConfig] = useState<AppConfig>({
    googleSheetWebhookUrl: '',
    whatsappNumber: '08068515242',
  });

  const [activeLead, setActiveLead] = useState<LeadOrder | null>(null);
  const [activeWhatsappUrl, setActiveWhatsappUrl] = useState<string>('');

  const [isSheetGuideOpen, setIsSheetGuideOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const orderFormRef = useRef<HTMLDivElement>(null);

  // Fetch initial config and leads & check for admin URL parameter
  useEffect(() => {
    fetchConfig();
    fetchLeads();

    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get('admin') === 'true' ||
      urlParams.get('admin') === '1' ||
      window.location.hash === '#admin'
    ) {
      setShowAdmin(true);
    }

    // Keyboard shortcut Ctrl+Shift+A to toggle admin mode secretly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        localStorage.setItem('peculiar_app_config', JSON.stringify(data));
        return;
      }
    } catch (e) {
      console.warn('Backend API unavailable, using local config:', e);
    }
    const saved = localStorage.getItem('peculiar_app_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {}
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        localStorage.setItem('peculiar_leads', JSON.stringify(data));
        return;
      }
    } catch (e) {
      console.warn('Backend API unavailable, using local leads cache:', e);
    }
    const saved = localStorage.getItem('peculiar_leads');
    if (saved) {
      try {
        setLeads(JSON.parse(saved));
      } catch {}
    }
  };

  const handleSelectPackage = (qty: '1 Unit' | '2 Units', amount: 'N30,000' | 'N55,000') => {
    setSelectedQuantity(qty);
    setSelectedAmount(amount);
  };

  const handleScrollToForm = () => {
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('order-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveConfig = async (newConfig: AppConfig) => {
    localStorage.setItem('peculiar_app_config', JSON.stringify(newConfig));
    setConfig(newConfig);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch (e) {
      console.warn('Server config update skipped (running static):', e);
    }
  };

  const handleSubmitLead = async (inputs: OrderFormInputs) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.lead) {
          setActiveLead(data.lead);
          setActiveWhatsappUrl(data.whatsappUrl);
          setLeads((prev) => {
            const updated = [data.lead, ...prev];
            localStorage.setItem('peculiar_leads', JSON.stringify(updated));
            return updated;
          });
          return { lead: data.lead, whatsappUrl: data.whatsappUrl };
        }
      }
    } catch (e) {
      console.warn('Direct server submission unavailable, processing client-side fallback:', e);
    }

    // Client-side fallback for Netlify static deployments
    const newLeadId = inputs.orderId || 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newLead: LeadOrder = {
      id: newLeadId,
      createdAt: new Date().toISOString(),
      name: inputs.name,
      email: inputs.email || '',
      phone1: inputs.phone1,
      phone2: inputs.phone2 || '',
      address: inputs.address,
      productName: inputs.productName,
      productQuantity: inputs.productQuantity,
      amount: inputs.amount,
      whenToReceive: inputs.whenToReceive,
      status: 'Pending',
      syncedToGoogleSheet: false,
    };

    // If Google Sheet webhook is available, send direct webhook call
    if (config.googleSheetWebhookUrl) {
      try {
        await fetch(config.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
        });
        newLead.syncedToGoogleSheet = true;
      } catch (err) {
        console.warn('Direct Google Sheet post error:', err);
      }
    }

    // Build WhatsApp message URL
    const cleanPhone = (config.whatsappNumber || '08068515242')
      .replace(/\D/g, '')
      .replace(/^0/, '234');

    const msg = `Hello! I just placed an order on your website for the Multi-Function Solar Transistor Radio:

📦 *ORDER DETAILS (#${newLead.id})*
👤 *Name:* ${newLead.name}
${newLead.email ? `✉️ *Email:* ${newLead.email}\n` : ''}📞 *Phone 1:* ${newLead.phone1}
${newLead.phone2 ? `📞 *Phone 2:* ${newLead.phone2}\n` : ''}📍 *Address:* ${newLead.address}
📻 *Product:* ${newLead.productName}
🔢 *Quantity:* ${newLead.productQuantity}
💰 *Amount:* ${newLead.amount}
📅 *When to receive:* ${newLead.whenToReceive}

Please confirm my order and dispatch details. Thank you!`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

    setActiveLead(newLead);
    setActiveWhatsappUrl(whatsappUrl);
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      localStorage.setItem('peculiar_leads', JSON.stringify(updated));
      return updated;
    });

    return { lead: newLead, whatsappUrl };
  };

  const handleResyncLead = async (id: string) => {
    try {
      const res = await fetch('/api/leads/resync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchLeads();
        return;
      }
    } catch (e) {
      console.warn('Backend resync skipped:', e);
    }
  };

  const handleUpdateStatus = async (id: string, status: LeadOrder['status']) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status } : l));
      localStorage.setItem('peculiar_leads', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Backend update skipped:', e);
    }
  };

  const handleDeleteLead = async (id: string) => {
    setLeads((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      localStorage.setItem('peculiar_leads', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Backend delete skipped:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-white">
      {/* Header */}
      <Header
        onScrollToForm={handleScrollToForm}
        onOpenSheetGuide={() => setIsSheetGuideOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        leadsCount={leads.length}
        showAdmin={showAdmin}
      />

      {/* Hero Section with Product Image top right */}
      <HeroSection onScrollToForm={handleScrollToForm} />

      {/* Customer Photo Section (Customer using product in real life) */}
      <CustomerPhotoSection onScrollToForm={handleScrollToForm} />

      {/* Detailed Features & Specs Highlights */}
      <FeatureHighlights onScrollToForm={handleScrollToForm} />

      {/* Pricing Packages */}
      <PricingOffers
        selectedPackage={selectedQuantity}
        onSelectPackage={handleSelectPackage}
        onScrollToForm={handleScrollToForm}
      />

      {/* Lead Order Form */}
      <OrderForm
        ref={orderFormRef}
        selectedQuantity={selectedQuantity}
        selectedAmount={selectedAmount}
        onSelectQuantity={handleSelectPackage}
        onSubmitLead={handleSubmitLead}
      />

      {/* Footer */}
      <Footer
        onScrollToForm={handleScrollToForm}
        onOpenSheetGuide={() => setIsSheetGuideOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        showAdmin={showAdmin}
      />

      {/* Modals */}
      <OrderSuccessModal
        lead={activeLead}
        whatsappUrl={activeWhatsappUrl}
        onClose={() => setActiveLead(null)}
      />

      <GoogleSheetGuideModal
        isOpen={isSheetGuideOpen}
        onClose={() => setIsSheetGuideOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      <AdminLeadsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        leads={leads}
        onRefresh={fetchLeads}
        onResync={handleResyncLead}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
      />
    </div>
  );
}
