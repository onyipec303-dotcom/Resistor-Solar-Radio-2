import React from 'react';
import { Star, ShieldCheck, HeartHandshake, UserCheck, MessageCircle } from 'lucide-react';
import brightCustomerImage from '../assets/images/bright_customer_using_radio_1786478391175.jpg';

interface CustomerPhotoSectionProps {
  onScrollToForm: () => void;
}

export function CustomerPhotoSection({ onScrollToForm }: CustomerPhotoSectionProps) {
  return (
    <section className="py-14 bg-stone-50 border-b-2 border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3.5 py-1 bg-orange-500 text-stone-950 border-2 border-stone-900 text-xs font-black tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
            REAL CUSTOMER EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tighter uppercase leading-none">
            SEE HOW NIGERIANS ENJOY THEIR RADIO EVERY DAY
          </h2>
          <p className="text-stone-700 text-base font-medium">
            Whether relaxing at home, staying updated during power outages, or listening on the go — our Multi-Function Solar Radio never fails.
          </p>
        </div>

        {/* Feature Grid: Main Customer Photo + Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Customer Photo */}
          <div className="lg:col-span-6">
            <div className="relative border-2 border-stone-900 bg-white shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] overflow-hidden group">
              <img
                src={brightCustomerImage}
                alt="Happy customer using the solar transistor radio outdoors in sunlight"
                className="w-full h-[380px] sm:h-[460px] object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent pt-16 p-6 text-stone-50 border-t border-stone-800 text-center">
                <div className="flex items-center justify-center gap-1 text-orange-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-orange-400" />
                  ))}
                  <span className="ml-2 text-xs font-black text-stone-50 uppercase tracking-wider">5.0 / 5.0 RATING</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-stone-100 leading-snug">
                  "The solar charging panel is a lifesaver during blackouts in my area! The sound is crisp, FM tuning is very strong, and the flashlight is surprisingly bright."
                </p>
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-orange-400 font-black border-t border-stone-800 pt-2 uppercase gap-1 text-center">
                  <span>Mr. Olabode A. — Lagos, Nigeria</span>
                  <span className="flex items-center gap-1 text-orange-400 justify-center">
                    <UserCheck className="w-3.5 h-3.5" /> Verified Purchase
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Customer Reviews List */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-stone-100 p-5 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-stone-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-stone-900" />
                  ))}
                </div>
                <span className="text-[11px] font-black uppercase text-stone-600">2 days ago</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                "Bought two units for myself and my parents in Ibadan. The solar panel works great under sunlight. No need for constant electricity before we enjoy news and music."
              </p>
              <p className="text-xs font-black text-stone-900 pt-1 uppercase">
                — Alh. Musa K., <span className="text-orange-600">Ibadan</span>
              </p>
            </div>

            <div className="bg-stone-100 p-5 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-stone-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-stone-900" />
                  ))}
                </div>
                <span className="text-[11px] font-black uppercase text-stone-600">3 days ago</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                "The delivery was fast to Port Harcourt. Tested the USB MP3 playback and flashlight immediately. Very sturdy radio. Highly recommended!"
              </p>
              <p className="text-xs font-black text-stone-900 pt-1 uppercase">
                — Chinedu E., <span className="text-orange-600">Port Harcourt</span>
              </p>
            </div>

            <div className="bg-stone-100 p-5 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-stone-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-stone-900" />
                  ))}
                </div>
                <span className="text-[11px] font-black uppercase text-stone-600">5 days ago</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                "Pay on delivery made me trust them. I received the package, inspected it, paid cash, and got my free gift. Wonderful service!"
              </p>
              <p className="text-xs font-black text-stone-900 pt-1 uppercase">
                — Mrs. Grace O., <span className="text-orange-600">Abuja</span>
              </p>
            </div>

            <div className="pt-2 text-center sm:text-left">
              <button
                onClick={onScrollToForm}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-black text-xs uppercase tracking-widest border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] inline-flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-orange-400" />
                <span>JOIN OVER 1,500 HAPPY CUSTOMERS — ORDER NOW</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
