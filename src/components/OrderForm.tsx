import React, { useState, forwardRef } from 'react';
import { Truck, ShieldCheck, Gift, CheckCircle2, Phone, MapPin, User, Mail, Calendar, Radio as RadioIcon, ArrowRight, Loader2, MessageSquare } from 'lucide-react';
import { OrderFormInputs, LeadOrder } from '../types';
import peculiarLogo from '../assets/images/peculiar_stores_logo.png';

interface OrderFormProps {
  selectedQuantity: '1 Unit' | '2 Units';
  selectedAmount: 'N30,000' | 'N55,000';
  onSelectQuantity: (qty: '1 Unit' | '2 Units', amount: 'N30,000' | 'N55,000') => void;
  onSubmitLead: (inputs: OrderFormInputs) => Promise<{ lead: LeadOrder; whatsappUrl: string } | null>;
}

export const OrderForm = forwardRef<HTMLDivElement, OrderFormProps>(({
  selectedQuantity,
  selectedAmount,
  onSelectQuantity,
  onSubmitLead,
}, ref) => {
  const [orderId] = useState(() => 'ORD-' + Math.floor(100000 + Math.random() * 900000));
  const [orderDate] = useState(() => new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [whenToReceive, setWhenToReceive] = useState('As soon as possible (Today/Tomorrow)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!phone1.trim() || phone1.trim().length < 10) {
      setErrorMessage('Please enter a valid Phone 1 number.');
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setErrorMessage('Please enter a detailed delivery address (House No., Street, Area & State).');
      return;
    }

    setIsSubmitting(true);

    try {
      const inputs: OrderFormInputs = {
        orderId,
        orderDate,
        name: name.trim(),
        email: email.trim(),
        phone1: phone1.trim(),
        phone2: phone2.trim(),
        address: address.trim(),
        productName: 'Multi-Function Solar Transistor Radio (Golon RX-366S)',
        productQuantity: selectedQuantity,
        amount: selectedAmount,
        whenToReceive,
      };

      await onSubmitLead(inputs);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit order. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} id="order-form-section" className="py-16 bg-stone-900 text-stone-50 border-b-2 border-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container Card */}
        <div className="bg-stone-50 text-stone-900 p-6 sm:p-10 border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] relative">
          
          {/* Top Form Banner */}
          <div className="bg-orange-500 text-stone-950 border-b-2 border-stone-900 -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 p-6 mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white border border-stone-900 p-0.5 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={peculiarLogo}
                  alt="Peculiar Stores"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif font-black text-xs text-stone-950 uppercase tracking-widest">
                PECULIAR STORES OFFICIAL ORDER DESK
              </span>
            </div>
            <span className="inline-block px-3 py-1 bg-stone-900 text-orange-400 border border-stone-900 text-[11px] font-black uppercase tracking-widest mb-2">
              PAY ON DELIVERY NATIONWIDE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none uppercase">
              FILL THE FORM BELOW TO PLACE YOUR ORDER NOW
            </h2>
            <p className="text-xs sm:text-sm font-black text-stone-950 uppercase mt-1">
              🚚 Free Delivery + 🎁 Free Bonus Gift Included!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {errorMessage && (
              <div className="p-4 bg-orange-100 border-l-4 border-stone-900 text-stone-900 text-xs sm:text-sm font-black uppercase">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Official Order Number & Date Banner */}
            <div className="bg-stone-900 text-stone-50 p-4 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange-500 text-stone-950 font-black border border-stone-900 flex items-center justify-center text-sm shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] shrink-0">
                  #
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 block leading-none">ORDER REFERENCE NUMBER</span>
                  <span className="text-base sm:text-lg font-black font-mono text-stone-100 tracking-wider">{orderId}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 block leading-none">DATE OF ORDER</span>
                  <span className="text-sm sm:text-base font-black text-stone-100">{orderDate}</span>
                </div>
              </div>
            </div>

            {/* Package Selection Buttons */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-stone-900 uppercase tracking-wider">
                1. SELECT YOUR PACKAGE QUANTITY & AMOUNT <span className="text-orange-600">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onSelectQuantity('1 Unit', 'N30,000')}
                  className={`p-4 border-2 border-stone-900 text-left transition-all flex items-center justify-between ${
                    selectedQuantity === '1 Unit'
                      ? 'bg-orange-500 text-stone-950 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                  }`}
                >
                  <div>
                    <span className="font-black text-sm uppercase block">1 Radio Unit</span>
                    <span className="text-xs font-bold text-stone-800">Pay N30K + Free Gift + Free Delivery</span>
                  </div>
                  <span className="text-lg font-black">N30,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectQuantity('2 Units', 'N55,000')}
                  className={`p-4 border-2 border-stone-900 text-left transition-all flex items-center justify-between ${
                    selectedQuantity === '2 Units'
                      ? 'bg-orange-500 text-stone-950 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                  }`}
                >
                  <div>
                    <span className="font-black text-sm uppercase block">2 Radio Units (Save N5K)</span>
                    <span className="text-xs font-bold text-stone-800">Pay N55K + Free Gift + Free Delivery</span>
                  </div>
                  <span className="text-lg font-black">N55,000</span>
                </button>
              </div>
            </div>

            {/* Product Name Display */}
            <div className="bg-stone-100 p-3.5 border-2 border-stone-900 text-xs font-bold uppercase flex items-center gap-2">
              <RadioIcon className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="text-stone-600">Product:</span>
              <strong className="text-stone-900">Multi-Function Solar Transistor Radio (Golon RX-366S)</strong>
            </div>

            {/* Form Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Order Number Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase flex items-center justify-between">
                  <span>Order Reference No.</span>
                  <span className="text-[10px] text-stone-500 font-bold">(Auto-Generated)</span>
                </label>
                <div className="relative">
                  <span className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-600 font-mono font-black text-sm flex items-center justify-center">#</span>
                  <input
                    type="text"
                    readOnly
                    value={orderId}
                    className="w-full pl-10 pr-4 py-3 bg-stone-200 border-2 border-stone-900 text-sm font-black font-mono text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] cursor-not-allowed select-all"
                  />
                </div>
              </div>

              {/* Date of Order Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase flex items-center justify-between">
                  <span>Date of Order</span>
                  <span className="text-[10px] text-stone-500 font-bold">(Today)</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <input
                    type="text"
                    readOnly
                    value={orderDate}
                    className="w-full pl-10 pr-4 py-3 bg-stone-200 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase">
                  Full Name <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Samuel Adebayo"
                    className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:bg-stone-50"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase">
                  Email Address <span className="text-stone-500">(Optional for updates)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. samuel@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:bg-stone-50"
                  />
                </div>
              </div>

              {/* Phone 1 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase">
                  Phone Number 1 <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <input
                    type="tel"
                    required
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:bg-stone-50"
                  />
                </div>
              </div>

              {/* Phone 2 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase">
                  Phone Number 2 <span className="text-stone-500">(Optional / WhatsApp)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <input
                    type="tel"
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                    placeholder="e.g. 08087654321"
                    className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:bg-stone-50"
                  />
                </div>
              </div>

              {/* When to receive */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-stone-900 uppercase">
                  When to Receive Delivery <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600" />
                  <select
                    value={whenToReceive}
                    onChange={(e) => setWhenToReceive(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
                  >
                    <option value="As soon as possible (Today/Tomorrow)">As soon as possible (Today/Tomorrow)</option>
                    <option value="Within 2 Days">Within 2 Days</option>
                    <option value="This Weekend">This Weekend</option>
                    <option value="Specific Date (Will specify on call)">Specific Date (Will specify on call)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Detailed Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-stone-900 uppercase">
                Detailed Delivery Address <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-600" />
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House Number, Street Name, Area/Landmark, City & State (e.g., No. 12 Allen Avenue, Near First Bank, Ikeja, Lagos State)"
                  className="w-full pl-10 pr-4 py-3 bg-stone-100 border-2 border-stone-900 text-sm font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:bg-stone-50"
                />
              </div>
            </div>

            {/* Order Summary & Submit Button */}
            <div className="pt-4 border-t-2 border-stone-900 space-y-4">
              
              <div className="bg-stone-900 text-stone-50 p-4 border-2 border-stone-900 flex flex-wrap items-center justify-between text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]">
                <div>
                  <span className="text-stone-300 font-bold">Selected Amount to Pay on Delivery:</span>
                  <div className="text-xl sm:text-3xl font-black text-orange-400 mt-0.5">{selectedAmount}</div>
                </div>
                <div className="text-right text-xs text-stone-300">
                  <span>Includes <strong>Free Gift</strong> & <strong>Free Delivery</strong></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-6 bg-orange-500 hover:bg-orange-600 text-stone-950 font-black text-lg sm:text-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-6 h-6 fill-current" />
                    <span>SUBMIT ORDER & CONFIRM ON WHATSAPP</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-900 font-extrabold uppercase pt-2 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-stone-900" />
                  No Upfront Payment Required
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-orange-600" />
                  Nationwide Express Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Gift className="w-4 h-4 text-orange-600" />
                  Free Gift Included
                </span>
              </div>

              <div className="text-center pt-2 border-t border-stone-300">
                <p className="text-xs font-black text-stone-800 uppercase">
                  Need instant help with your order?
                </p>
                <a
                  href="https://wa.me/2348068515242?text=Hello!%20I%20need%20help%20placing%20my%20order%20for%20the%20Golon%20Solar%20Radio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-900 underline uppercase mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 fill-current text-emerald-700" />
                  <span>Call / WhatsApp Hotline: 08068515242</span>
                </a>
              </div>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
});

OrderForm.displayName = 'OrderForm';
