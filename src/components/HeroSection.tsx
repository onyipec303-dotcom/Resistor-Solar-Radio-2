import React from 'react';
import { Sun, Radio, Music, Zap, ShieldCheck, Truck, Gift, CheckCircle, ArrowRight, Flame } from 'lucide-react';
import brightProductImage from '../assets/images/golon_rx366s_radio_1786523616638.jpg';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export function HeroSection({ onScrollToForm }: HeroSectionProps) {
  return (
    <section className="relative bg-stone-50 py-10 md:py-16 border-b-2 border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Left Copy & Right Product Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Urgency & Product Name Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                <img
                  src={peculiarLogo}
                  alt="Peculiar Stores"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 object-contain"
                />
                <span className="font-serif font-black text-xs text-stone-950 uppercase tracking-wider">PECULIAR STORES</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500 border-2 border-stone-900 text-stone-900 font-black text-xs tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                <Flame className="w-4 h-4 fill-stone-900" />
                <span>GOLON RX-366S MODEL</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-orange-400 border-2 border-stone-900 font-black text-xs tracking-wider uppercase shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                <Radio className="w-4 h-4 text-orange-400" />
                <span>SOLAR TRANSISTOR RADIO</span>
              </div>
            </div>

            {/* Main Primary Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95] uppercase text-center">
              NEVER MISS A MOMENT — <span className="text-orange-500">POWER YOUR ENTERTAINMENT ANYWHERE!</span>
            </h1>

            {/* Product Name Sub-heading */}
            <div className="bg-stone-900 text-stone-50 p-3.5 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] text-center">
              <span className="text-xs font-black uppercase text-orange-400 tracking-widest block mb-0.5">
                ORIGINAL GOLON RX-366S NIGERIA
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                SOLAR-SONIC <span className="text-orange-400">RX-366S</span> TRANSISTOR RADIO
              </h2>
            </div>

            {/* Subheadline */}
            <h2 className="text-base sm:text-lg font-black text-stone-800 uppercase tracking-tight bg-stone-200/80 p-2.5 border-l-4 border-stone-900 text-center">
              📻 Multi-Function Solar Charging • FM/AM Radio • MP3 Player • Flashlight
            </h2>

            {/* Main Descriptive Copy */}
            <p className="text-stone-700 text-base sm:text-lg leading-snug font-medium max-w-xl">
              Stay informed, entertained, and prepared wherever you go. Power your entertainment anywhere—from the home to the wild with <strong>FM Radio</strong>, <strong>MP3 Music</strong>, <strong>Solar Charging</strong>, and <strong>Built-in Flashlight</strong>.
            </p>

            {/* Quick Feature Grid with Border-L-4 Accent */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-4 border-orange-500 bg-stone-100 p-3 border-y border-r border-stone-300">
                <h3 className="font-black text-xs uppercase mb-1 text-stone-900 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-orange-600" />
                  Power It Your Way
                </h3>
                <p className="text-xs text-stone-600 leading-snug">
                  Integrated solar panel for charging without electricity. Perfect for outages.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-stone-100 p-3 border-y border-r border-stone-300">
                <h3 className="font-black text-xs uppercase mb-1 text-stone-900 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-orange-600" />
                  Music Your Way
                </h3>
                <p className="text-xs text-stone-600 leading-snug">
                  FM Radio, MP3 support via USB, and crystal clear speaker tuning.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-stone-100 p-3 border-y border-r border-stone-300">
                <h3 className="font-black text-xs uppercase mb-1 text-stone-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-orange-600" />
                  Integrated Light
                </h3>
                <p className="text-xs text-stone-600 leading-snug">
                  Built-in powerful flashlight for blackouts and outdoor night movement.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-stone-100 p-3 border-y border-r border-stone-300">
                <h3 className="font-black text-xs uppercase mb-1 text-stone-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-600" />
                  Full Portability
                </h3>
                <p className="text-xs text-stone-600 leading-snug">
                  Compact design with top handle for travel and everyday adventure.
                </p>
              </div>
            </div>

            {/* Pricing Offer Highlights */}
            <div className="bg-stone-900 border-2 border-stone-900 p-5 text-stone-50 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] space-y-3">
              <div className="text-xs uppercase font-black text-orange-400 tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                SPECIAL PROMO PRICING (PAY ON DELIVERY NATIONWIDE)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-bold">
                <div className="bg-stone-800 p-3 border border-stone-700 flex items-center justify-between">
                  <span className="uppercase text-xs">01. Single Pack</span>
                  <strong className="text-orange-400 text-lg font-black">N30,000</strong>
                </div>
                <div className="bg-orange-500 text-stone-950 p-3 border-2 border-stone-900 flex items-center justify-between">
                  <span className="uppercase text-xs font-black">02. Family Pack</span>
                  <strong className="text-stone-950 text-lg font-black">N55,000</strong>
                </div>
              </div>
              <p className="text-[11px] text-stone-300 flex items-center gap-1 uppercase font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Free Gift + Free Delivery to your doorstep anywhere in Nigeria</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onScrollToForm}
                className="py-4 px-6 bg-orange-500 hover:bg-orange-600 text-stone-950 font-black text-base sm:text-lg border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase tracking-wider group"
              >
                <span>ORDER YOUR RADIO TODAY</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/2348068515242?text=Hello!%20I%20want%20to%20order%20the%20Golon%20RX-366S%20Solar%20Transistor%20Radio."
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-stone-50 font-black text-base sm:text-lg border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>WHATSAPP: 08068515242</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-800 font-extrabold uppercase pt-1">
              <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
              <span>Zero Risk • Pay When Package Arrives • Call/WhatsApp: 08068515242</span>
            </div>

          </div>

          {/* Right Column: TOP RIGHT BRIGHT PRODUCT IMAGE */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Badges */}
              <div className="absolute -top-4 -left-4 z-20 bg-orange-500 text-stone-950 font-black text-xs px-4 py-2 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] uppercase tracking-wider transform -rotate-2">
                ☀️ 100% BRIGHT SOLAR POWER
              </div>

              {/* Side Turning Button Badge - Positioned on the side of the product */}
              <div className="absolute top-1/4 -right-2 sm:-right-6 z-30 bg-stone-900 text-orange-400 font-black text-[11px] sm:text-xs px-3 py-2 border-2 border-orange-400 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] uppercase tracking-wider flex items-center gap-1.5 transform rotate-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping shrink-0" />
                <span>🎛️ EASY SIDE TURNING BUTTON</span>
              </div>

              {/* Main Product Frame with Bright Shadow & Border */}
              <div className="border-2 border-stone-900 bg-white p-2 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] relative overflow-hidden group">
                <img
                  src={brightProductImage}
                  alt="Golon RX-366S Multi-Function Solar Transistor Radio"
                  className="w-full h-auto object-cover rounded-none transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Overlay Badge */}
                <div className="bg-stone-900 p-4 text-stone-50 border-t-2 border-stone-900 -mx-2 -mb-2 mt-2">
                  <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
                    <div>
                      <p className="font-black text-xs text-orange-400 uppercase tracking-wider">SOLAR-SONIC GOLON RX-366S</p>
                      <p className="text-[11px] text-stone-300 font-medium">Side Turning Button • Solar Panel • FM/MP3 • Flashlight</p>
                    </div>
                    <span className="text-xs bg-orange-500 text-stone-950 font-black px-2.5 py-1 border border-stone-900 uppercase shrink-0">
                      IN STOCK
                    </span>
                  </div>
                </div>
              </div>

              {/* Extra reassurance card */}
              <div className="mt-4 bg-orange-100 border-2 border-stone-900 p-3 text-center shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                <p className="text-xs font-black text-stone-900 uppercase">
                  🎁 BONUS: FREE SURPRISE GIFT INCLUDED WITH EVERY ORDER!
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
