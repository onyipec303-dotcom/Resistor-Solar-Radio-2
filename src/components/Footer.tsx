import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Truck, Radio, MapPin } from 'lucide-react';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface FooterProps {
  onScrollToForm: () => void;
  onOpenSheetGuide?: () => void;
  onOpenAdminModal?: () => void;
  showAdmin?: boolean;
}

export function Footer({ onScrollToForm, onOpenSheetGuide, onOpenAdminModal, showAdmin = false }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t-2 border-stone-900 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-stone-50">
              <div className="w-12 h-12 bg-white border-2 border-stone-100 p-0.5 shadow-[2px_2px_0px_0px_rgba(249,115,22,1)] shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={peculiarLogo}
                  alt="Peculiar Stores Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-black text-sm tracking-wider uppercase font-serif text-white block">
                  PECULIAR STORES
                </span>
                <span className="font-bold text-xs text-orange-400 uppercase tracking-tight block">
                  SOLAR-SONIC RX-366S
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-medium">
              Official merchant for the Golon RX-366S Multi-Function Transistor Radio in Nigeria. Premium quality solar electronics with pay on delivery guarantee.
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-2">
            <h4 className="font-black text-orange-400 text-xs uppercase tracking-widest">Customer Support</h4>
            <p className="flex items-center gap-2 text-stone-100 font-bold">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call / SMS: 08068515242</span>
            </p>
            <p className="flex items-center gap-2 text-stone-100 font-bold">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>WhatsApp: 08068515242</span>
            </p>
            <p className="text-xs text-stone-400 pt-1 font-medium">
              Available 24/7 for order confirmations and inquiries.
            </p>
          </div>

          {/* Delivery & Guarantee */}
          <div className="space-y-2">
            <h4 className="font-black text-orange-400 text-xs uppercase tracking-widest">Guarantee & Delivery</h4>
            <p className="flex items-center gap-1.5 text-stone-200 font-bold">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>Fast 1-3 Days Delivery Nationwide</span>
            </p>
            <p className="flex items-center gap-1.5 text-stone-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Pay On Delivery — Zero Risk</span>
            </p>
            <p className="flex items-center gap-1.5 text-stone-200 font-bold">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Lagos, Abuja, PH, Kano & All States</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-black text-orange-400 text-xs uppercase tracking-widest">Quick Links</h4>
            <button
              onClick={onScrollToForm}
              className="block font-black text-orange-400 hover:text-orange-300 uppercase tracking-wider text-xs"
            >
              👉 Order Transistor Radio
            </button>

            {showAdmin && onOpenSheetGuide && (
              <button
                onClick={onOpenSheetGuide}
                className="block font-bold text-stone-300 hover:text-stone-50 uppercase tracking-wider text-xs"
              >
                📊 Google Sheet Integration Setup
              </button>
            )}

            {showAdmin && onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="block font-bold text-stone-300 hover:text-stone-50 uppercase tracking-wider text-xs"
              >
                📦 View Submitted Leads / Orders
              </button>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-stone-400 font-bold uppercase">
          <p>© {new Date().getFullYear()} Peculiar Stores • Solar-Sonic RX-366S Radio Nigeria. All Rights Reserved.</p>
          <p>Pay on delivery guaranteed. Free gift included with every purchase.</p>
        </div>

      </div>
    </footer>
  );
}
