import React, { useEffect } from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { LeadOrder } from '../types';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface OrderSuccessModalProps {
  lead: LeadOrder | null;
  whatsappUrl: string;
  onClose: () => void;
}

export function OrderSuccessModal({ lead, whatsappUrl, onClose }: OrderSuccessModalProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (lead && whatsappUrl) {
      // Auto open WhatsApp window after a tiny delay if popups are permitted
      const timer = setTimeout(() => {
        try {
          window.open(whatsappUrl, '_blank');
        } catch (e) {
          console.log('Popup blocked, user can click button');
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [lead, whatsappUrl]);

  if (!lead) return null;

  const handleCopySummary = () => {
    const summary = `ORDER #${lead.id}\nName: ${lead.name}\nPhone 1: ${lead.phone1}\nPhone 2: ${lead.phone2 || 'N/A'}\nAddress: ${lead.address}\nProduct: ${lead.productName}\nQty: ${lead.productQuantity}\nAmount: ${lead.amount}\nReceive: ${lead.whenToReceive}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 text-center shadow-2xl border border-emerald-200 my-8 relative animate-in fade-in zoom-in duration-300">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white border border-slate-300 p-0.5 rounded-md shadow-sm overflow-hidden flex items-center justify-center">
            <img
              src={peculiarLogo}
              alt="Peculiar Stores"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif font-black text-xs text-slate-900 uppercase tracking-widest">
            PECULIAR STORES
          </span>
        </div>

        {/* Animated Badge */}
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
          Step 1 of 2 Complete
        </span>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
          ORDER RECEIVED! 🎉
        </h2>
        
        <p className="text-sm text-slate-600 mt-2">
          Your order <span className="font-bold font-mono text-emerald-700">#{lead.id}</span> has been logged! Now click below to confirm your order details directly on WhatsApp with our sales rep.
        </p>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-6 text-left text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-700 uppercase tracking-wide">Order Summary</span>
            <button
              onClick={handleCopySummary}
              className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-800">
            <div><span className="text-slate-500">Name:</span> <strong>{lead.name}</strong></div>
            <div><span className="text-slate-500">Amount:</span> <strong className="text-emerald-700">{lead.amount}</strong></div>
            <div><span className="text-slate-500">Phone 1:</span> <strong>{lead.phone1}</strong></div>
            <div><span className="text-slate-500">Phone 2:</span> <strong>{lead.phone2 || 'N/A'}</strong></div>
            <div className="col-span-2"><span className="text-slate-500">Package:</span> <strong>{lead.productQuantity}</strong></div>
            <div className="col-span-2"><span className="text-slate-500">Delivery Address:</span> <strong>{lead.address}</strong></div>
            <div className="col-span-2"><span className="text-slate-500">When to receive:</span> <strong>{lead.whenToReceive}</strong></div>
          </div>
        </div>

        {/* Big WhatsApp CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 group"
        >
          <MessageSquare className="w-6 h-6 fill-current shrink-0" />
          <span>CONFIRM ON WHATSAPP NOW</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Pay on delivery • Free Gift included • 100% Guaranteed</span>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline font-medium"
        >
          Close window & return to page
        </button>
      </div>
    </div>
  );
}
