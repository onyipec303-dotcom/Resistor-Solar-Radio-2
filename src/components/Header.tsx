import React from 'react';
import { Radio, Sheet, Database, Phone, ShieldCheck, Zap } from 'lucide-react';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenSheetGuide?: () => void;
  onOpenAdminModal?: () => void;
  leadsCount?: number;
  showAdmin?: boolean;
}

export function Header({
  onScrollToForm,
  onOpenSheetGuide,
  onOpenAdminModal,
  leadsCount = 0,
  showAdmin = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-orange-500 border-b-2 border-stone-900 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-50 font-black text-[11px] sm:text-xs py-2 px-3 text-center flex flex-wrap items-center justify-center gap-2 border-b border-stone-800">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" />
          <span className="tracking-wider">PECULIAR STORES: FREE BONUS GIFT + FREE DELIVERY TODAY!</span>
        </div>
        <span className="text-stone-600 hidden sm:inline">|</span>
        <a
          href="https://wa.me/2348068515242"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 underline font-bold flex items-center gap-1"
        >
          <Phone className="w-3 h-3 text-orange-400" />
          <span>Call/WhatsApp: 08068515242</span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-stone-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] shrink-0 overflow-hidden flex items-center justify-center">
            <img
              src={peculiarLogo}
              alt="Peculiar Stores Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-stone-950 text-xs sm:text-sm tracking-wider uppercase font-serif">
                PECULIAR STORES
              </span>
              <span className="text-[9px] bg-stone-900 text-orange-400 px-1 py-0.2 font-black uppercase tracking-widest hidden sm:inline-block">
                VERIFIED
              </span>
            </div>
            <span className="font-black text-stone-900 text-base sm:text-xl tracking-tighter block leading-none">
              SOLAR-SONIC <span className="text-stone-950 font-black underline decoration-stone-900 decoration-2">RX-366S</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Admin & Setup Tools ONLY shown if showAdmin is true */}
          {showAdmin && onOpenSheetGuide && (
            <button
              onClick={onOpenSheetGuide}
              className="p-2 sm:px-3 sm:py-2 bg-stone-50 hover:bg-stone-900 hover:text-stone-50 text-stone-900 border-2 border-stone-900 rounded-none text-xs font-black uppercase flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
              title="Configure Google Sheet Auto-Sync"
            >
              <Sheet className="w-4 h-4 shrink-0 text-emerald-700" />
              <span className="hidden md:inline">Google Sheet Setup</span>
            </button>
          )}

          {showAdmin && onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="p-2 sm:px-3 sm:py-2 bg-stone-50 hover:bg-stone-900 hover:text-stone-50 text-stone-900 border-2 border-stone-900 rounded-none text-xs font-black uppercase flex items-center gap-1.5 transition-colors relative shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
              title="View Submitted Orders"
            >
              <Database className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">Orders</span>
              {leadsCount > 0 && (
                <span className="bg-stone-900 text-orange-400 text-[10px] font-black px-1.5 py-0.2 border border-orange-400">
                  {leadsCount}
                </span>
              )}
            </button>
          )}

          {/* WhatsApp Direct Contact Button - On Same Line with Order Now */}
          <a
            href="https://wa.me/2348068515242"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 transition-all hover:translate-x-0.5 hover:translate-y-0.5 shrink-0"
            title="Chat or Call WhatsApp: 08068515242"
          >
            <Phone className="w-3.5 h-3.5 text-white fill-current shrink-0" />
            <span className="hidden sm:inline">WhatsApp:</span>
            <span>08068515242</span>
          </a>

          {/* Primary CTA button */}
          <button
            onClick={onScrollToForm}
            className="px-3 sm:px-6 py-2 sm:py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all shrink-0"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </header>
  );
}
