import React from 'react';
import { Gift, Truck, Check, Zap, ShieldCheck } from 'lucide-react';

interface PricingOffersProps {
  selectedPackage: string;
  onSelectPackage: (pkg: '1 Unit' | '2 Units', amount: 'N30,000' | 'N55,000') => void;
  onScrollToForm: () => void;
}

export function PricingOffers({ selectedPackage, onSelectPackage, onScrollToForm }: PricingOffersProps) {
  return (
    <section className="py-16 bg-stone-50 border-b-2 border-stone-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3.5 py-1 bg-orange-500 text-stone-950 border-2 border-stone-900 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
            EXCLUSIVE DISCOUNT PACKAGES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tighter uppercase leading-none">
            CHOOSE YOUR OFFER PACKAGE
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-medium">
            Select a package below to automatically update your order form. <strong>Free Gift + Free Delivery Included!</strong>
          </p>
        </div>

        {/* 2 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Package 1: 1 Radio Unit */}
          <div
            onClick={() => onSelectPackage('1 Unit', 'N30,000')}
            className={`cursor-pointer p-6 sm:p-8 transition-all duration-300 relative border-2 flex flex-col justify-between ${
              selectedPackage === '1 Unit'
                ? 'bg-stone-100 border-stone-900 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]'
                : 'bg-stone-100 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] hover:shadow-[5px_5px_0px_0px_rgba(28,25,23,1)]'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900 uppercase tracking-wider">
                  01. SINGLE PACKAGE
                </span>
                {selectedPackage === '1 Unit' && (
                  <span className="bg-orange-500 text-stone-950 text-xs font-black px-3 py-1 border border-stone-900 flex items-center gap-1 uppercase">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-stone-900 uppercase">1 Radio Unit</h3>
                <p className="text-xs font-bold text-stone-600">Perfect for single household or personal travel</p>
              </div>

              <div className="flex items-baseline gap-2 py-2 border-y-2 border-stone-900">
                <span className="text-3xl sm:text-4xl font-black text-orange-600">N30,000</span>
                <span className="text-sm text-stone-500 line-through font-bold">N45,000</span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 font-bold">
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span><strong>FREE Delivery</strong> anywhere in Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-orange-600 shrink-0" />
                  <span><strong>FREE Bonus Gift</strong> included in package</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span><strong>Pay On Delivery</strong> (No upfront risk)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPackage('1 Unit', 'N30,000');
                onScrollToForm();
              }}
              className="mt-6 w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 border-2 border-stone-900 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] text-center transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Order 1 Unit for N30,000
            </button>
          </div>

          {/* Package 2: 2 Radio Units (Best Value) */}
          <div
            onClick={() => onSelectPackage('2 Units', 'N55,000')}
            className={`cursor-pointer p-6 sm:p-8 transition-all duration-300 relative border-2 flex flex-col justify-between ${
              selectedPackage === '2 Units'
                ? 'bg-stone-100 border-stone-900 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]'
                : 'bg-stone-100 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] hover:shadow-[5px_5px_0px_0px_rgba(28,25,23,1)]'
            }`}
          >
            {/* Best Value Tag */}
            <div className="absolute -top-4 right-8 bg-orange-500 text-stone-950 font-black text-[11px] px-3.5 py-1 border-2 border-stone-900 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              🔥 MOST POPULAR — SAVE N5,000
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900 uppercase tracking-wider">
                  02. DOUBLE PACKAGE
                </span>
                {selectedPackage === '2 Units' && (
                  <span className="bg-orange-500 text-stone-950 text-xs font-black px-3 py-1 border border-stone-900 flex items-center gap-1 uppercase">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-stone-900 uppercase">2 Radio Units</h3>
                <p className="text-xs font-bold text-stone-600">Keep one at home & give one to family/parents</p>
              </div>

              <div className="flex items-baseline gap-2 py-2 border-y-2 border-stone-900">
                <span className="text-3xl sm:text-4xl font-black text-orange-600">N55,000</span>
                <span className="text-sm text-stone-500 line-through font-bold">N90,000</span>
                <span className="text-xs bg-orange-200 text-stone-950 font-black px-2 py-0.5 border border-stone-900 uppercase ml-auto">
                  Save N5,000
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 font-bold">
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span><strong>FREE Delivery</strong> anywhere in Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-orange-600 shrink-0" />
                  <span><strong>2 FREE Bonus Gifts</strong> included in package</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                  <span><strong>Pay On Delivery</strong> (Inspect before payment)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPackage('2 Units', 'N55,000');
                onScrollToForm();
              }}
              className="mt-6 w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-stone-950 border-2 border-stone-900 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] text-center transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Order 2 Units for N55,000
            </button>
          </div>

        </div>

        {/* Direct WhatsApp Contact Bar */}
        <div className="mt-10 p-4 bg-emerald-700 text-stone-50 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-black text-sm uppercase tracking-wider text-white">Prefer to order directly via WhatsApp or phone call?</p>
            <p className="text-xs text-stone-200 font-medium">Speak directly with our support team in Nigeria for instant assistance.</p>
          </div>
          <a
            href="https://wa.me/2348068515242?text=Hello!%20I%20want%20to%20place%20an%20order%20for%20the%20Golon%20RX-366S%20Solar%20Transistor%20Radio."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-orange-400 border-2 border-stone-900 font-black text-xs uppercase tracking-wider shrink-0 transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            💬 CALL / WHATSAPP: 08068515242
          </a>
        </div>

      </div>
    </section>
  );
}
