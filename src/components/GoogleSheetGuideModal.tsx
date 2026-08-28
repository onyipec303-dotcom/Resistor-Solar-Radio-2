import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Sheet, Send, AlertCircle, RefreshCw } from 'lucide-react';
import { AppConfig } from '../types';

interface GoogleSheetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => Promise<void>;
}

export const GOOGLE_APPS_SCRIPT_CODE = `function doGet(e) {
  return ContentService.createTextOutput("Google Sheet Order Webhook is active!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID", 
        "Date & Time", 
        "Customer Name", 
        "Phone 1", 
        "Phone 2", 
        "Detailed Address", 
        "Product Name", 
        "Quantity", 
        "Amount (NGN)", 
        "When to Receive"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1c1917");
      headerRange.setFontColor("#f97316");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    sheet.appendRow([
      data.id || ("ORD-" + new Date().getTime()),
      data.createdAt || new Date().toLocaleString(),
      data.name || "",
      "'" + (data.phone1 || ""),
      "'" + (data.phone2 || ""),
      data.address || "",
      data.productName || "Solar Radio",
      data.productQuantity || "1 Unit",
      data.amount || "N30,000",
      data.whenToReceive || "As soon as possible"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "status": "Logged to Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
};`

export function GoogleSheetGuideModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}: GoogleSheetGuideModalProps) {
  const [copied, setCopied] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState(config.googleSheetWebhookUrl || '');
  const [whatsappNumberInput, setWhatsappNumberInput] = useState(config.whatsappNumber || '08068515242');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await onSaveConfig({
        googleSheetWebhookUrl: webhookUrlInput.trim(),
        whatsappNumber: whatsappNumberInput.trim(),
      });
      setSaveMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: 'Failed to save settings: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrlInput.trim()) {
      setTestResult({ success: false, text: 'Please enter a Google Sheet Webhook URL first.' });
      return;
    }
    setTestingWebhook(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: webhookUrlInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResult({ success: true, text: 'Test lead successfully sent to Google Sheet!' });
      } else {
        setTestResult({ success: false, text: 'Webhook error: ' + (data.error || 'Failed to connect') });
      }
    } catch (err: any) {
      setTestResult({ success: false, text: 'Error testing webhook: ' + err.message });
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 my-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700/80 rounded-lg">
              <Sheet className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Google Sheets Integration Setup</h2>
              <p className="text-xs text-emerald-200">Automatically capture all customer order details into your Google Sheet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Settings Form */}
          <form onSubmit={handleSave} className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-4">
            <h3 className="font-semibold text-emerald-950 text-base flex items-center gap-2">
              <Sheet className="w-5 h-5 text-emerald-600" />
              1. Save Your Google Sheet Web App URL
            </h3>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Google Apps Script Web App URL
              </label>
              <input
                type="url"
                value={webhookUrlInput}
                onChange={(e) => setWebhookUrlInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste the URL generated from Step 3 below.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Target WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={whatsappNumberInput}
                onChange={(e) => setWhatsappNumberInput(e.target.value)}
                placeholder="08068515242"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono"
              />
            </div>

            {saveMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  saveMessage.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {saveMessage.text}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Configuration'}
              </button>

              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={testingWebhook || !webhookUrlInput}
                className="px-4 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {testingWebhook ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-600" />
                    Test Connection
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{testResult.text}</span>
              </div>
            )}
          </form>

          {/* Step by Step instructions */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Step-by-Step Setup Instructions</h3>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-emerald-700 mr-2">STEP 1:</span>
                Open a new blank Google Sheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold underline inline-flex items-center gap-1">sheets.new <ExternalLink className="w-3 h-3" /></a> and name it (e.g. <i>Radio Lead Orders</i>).
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-700 mr-2">STEP 2:</span>
                    In Google Sheets menu, click <b>Extensions &gt; Apps Script</b>. Replace all code in the editor with this script:
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Script Code'}
                  </button>
                </div>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-56 leading-relaxed">
                  <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>CRITICAL STEP: Why Orders Might Not Show Yet</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  By default, Google sets <b>"Who has access"</b> to <i>"Only myself"</i>, which blocks external website orders. To fix this immediately:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs font-bold text-amber-950 ml-2">
                  <li>In Google Apps Script, click <b>Deploy &gt; New deployment</b> (or Manage deployments &gt; Edit).</li>
                  <li>Set <b>Who has access</b> to: <span className="bg-amber-200 px-1.5 py-0.5 rounded text-red-900">ANYONE</span>.</li>
                  <li>Click <b>Deploy</b>, authorize permissions, and copy the new Web App URL.</li>
                </ol>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="font-bold text-emerald-700 mr-2">STEP 3:</span>
                Deploy as Web App:
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600 ml-2 mt-1">
                  <li>Click <b>Deploy &gt; New deployment</b> at top right.</li>
                  <li>Click the gear icon next to "Select type" and choose <b>Web app</b>.</li>
                  <li>Set <b>Execute as</b> to: <i>Me</i>.</li>
                  <li>Set <b>Who has access</b> to: <b><i>Anyone</i></b> (Essential for receiving public orders!).</li>
                  <li>Click <b>Deploy</b>, authorize permissions, and copy the <b>Web app URL</b>.</li>
                  <li>Paste the Web app URL in Step 1 above and click <b>Save Configuration</b>!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
