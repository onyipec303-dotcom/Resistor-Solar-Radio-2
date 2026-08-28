import React from 'react';
import { Sun, Radio, Music, Zap, CheckCircle2, ShieldAlert, Sparkles, Compass } from 'lucide-react';

interface FeatureHighlightsProps {
  onScrollToForm: () => void;
}

export function FeatureHighlights({ onScrollToForm }: FeatureHighlightsProps) {
  return (
    <section className="py-16 bg-stone-900 text-stone-50 border-b-2 border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-stone-950 border-2 border-stone-900 text-xs font-black tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            UNMATCHED VERSATILITY & CONVENIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-stone-50 uppercase leading-none">
            BE READY FOR POWER OUTAGES, TRAVEL & EVERYDAY ADVENTURES
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-medium">
            Why carry several gadgets when one compact radio can do it all? <br className="hidden sm:inline" />
            <strong className="text-orange-400 font-black uppercase">Listen. Play. Charge. Light up your way.</strong>
          </p>
        </div>

        {/* 3 Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Solar Power */}
          <div className="bg-stone-800 border-2 border-stone-700 p-7 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] group">
            <div className="w-14 h-14 bg-orange-500 border-2 border-stone-900 text-stone-950 flex items-center justify-center font-black mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-orange-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              ☀️ POWER IT YOUR WAY
            </h3>
            <p className="text-stone-200 text-sm leading-relaxed mb-4">
              <strong>No electricity? No problem.</strong>
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              With its built-in solar panel, you can recharge the radio using sunlight—making it a practical companion for homes, travel, outdoor activities, and emergencies.
            </p>
          </div>

          {/* Card 2: Music & USB */}
          <div className="bg-stone-800 border-2 border-stone-700 p-7 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] group">
            <div className="w-14 h-14 bg-orange-500 border-2 border-stone-900 text-stone-950 flex items-center justify-center font-black mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Music className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-orange-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              🎵 YOUR MUSIC. YOUR WAY.
            </h3>
            <p className="text-stone-200 text-sm leading-relaxed mb-4">
              <strong>Crystal-clear audio anytime.</strong>
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Enjoy your favorite stations on FM Radio or play your own music through MP3. With USB support, your entertainment is always within reach.
            </p>
          </div>

          {/* Card 3: Flashlight */}
          <div className="bg-stone-800 border-2 border-stone-700 p-7 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] group">
            <div className="w-14 h-14 bg-orange-500 border-2 border-stone-900 text-stone-950 flex items-center justify-center font-black mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-orange-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              🔦 MORE THAN JUST A RADIO
            </h3>
            <p className="text-stone-200 text-sm leading-relaxed mb-4">
              <strong>Instant light in dark situations.</strong>
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              When darkness strikes, simply switch on the built-in flashlight. Whether you're at home during a power outage, camping outdoors, or moving around at night, you've got a handy light right beside you.
            </p>
          </div>

        </div>

        {/* Feature List: ONE DEVICE. MULTIPLE USES. */}
        <div className="bg-stone-800 border-2 border-stone-700 p-8 md:p-10 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]">
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-orange-400 uppercase tracking-wider">
                🔌 ONE DEVICE. MULTIPLE USES.
              </h3>
              <p className="text-stone-300 text-sm font-bold uppercase">
                Everything you need for everyday entertainment and emergency preparedness:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              
              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">Side Turning Button</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Smooth side knob for easy station tuning & volume</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">FM Radio</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Stay connected to your favorite stations</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">MP3 Player</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Enjoy your own custom playlist</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">Solar Panel</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Harness sunlight for convenient charging</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">USB Support</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Easy music playback and connectivity</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">Built-in Flashlight</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Light up dark spaces during power outages</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900 p-4 border border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-stone-50 text-sm uppercase">Portable Design</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Easy to carry wherever you go</p>
                </div>
              </div>

            </div>

            <div className="pt-6 text-center">
              <button
                onClick={onScrollToForm}
                className="py-3.5 px-8 bg-orange-500 hover:bg-orange-400 text-stone-950 font-black text-base border-2 border-stone-900 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              >
                 👉 GET YOUR MULTI-FUNCTION TRANSISTOR RADIO TODAY!
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
