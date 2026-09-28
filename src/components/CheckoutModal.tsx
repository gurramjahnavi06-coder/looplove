import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, Check, ArrowRight, Smartphone, Truck, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    cartSubtotal,
    shippingFee,
    discountRate,
    promoCodeApplied,
    completeCheckout
  } = useShop();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('VT');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  if (!isCheckoutOpen) return null;

  const discountAmount = cartSubtotal * discountRate;
  const giftWrapFee = cart.some((i) => i.giftWrap) ? 5 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  // Auto-format card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  // Auto-format MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    setCardExpiry(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !street || !city || !postalCode) {
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Establishing 256-bit TLS Handshake...');

    setTimeout(() => {
      setProcessingStatus('Verifying tokenized payment details...');
    }, 800);

    setTimeout(() => {
      setProcessingStatus('Securing artisan order booking...');
    }, 1500);

    setTimeout(() => {
      setIsProcessing(false);
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B25329', '#CF9943', '#879783', '#523B2A']
        });
      } catch {
        // ignore
      }

      completeCheckout({
        customerName,
        customerEmail,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country
        },
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Stripe Encrypted)'
            : paymentMethod === 'apple-pay'
            ? 'Apple Pay / Digital Wallet'
            : 'Cash / Pay on Delivery',
        cardLast4: cardNumber ? cardNumber.replace(/\s/g, '').slice(-4) : '8821'
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl border border-[#EADBCC] w-full max-w-4xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBCC] bg-[#F7F2EB]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D2825]">
              Secure Encrypted Checkout Gateway
            </span>
          </div>
          <button
            onClick={closeCheckout}
            disabled={isProcessing}
            className="p-1.5 text-[#6B5F57] hover:text-[#2D2825] rounded-full hover:bg-[#ECE3D5] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {isProcessing ? (
            <div className="py-20 text-center space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-[#B25329]/20 border-t-[#B25329] rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#2D2825]">
                  Securing Your Handmade Order
                </h3>
                <p className="text-xs text-[#5C524C] font-mono animate-pulse">
                  {processingStatus}
                </p>
              </div>
              <div className="text-[11px] text-[#8C8077] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>End-to-end encrypted · Do not close this window</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Shipping & Payment Form: 7 cols */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Contact Information */}
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#2D2825] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>1. Customer & Delivery Address</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Elena Vance"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="elena@example.com"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="742 Evergreen Maple Rd, Apt 4B"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Burlington"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="VT"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="05401"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div className="pt-4 border-t border-[#EADBCC]">
                  <h3 className="text-sm font-serif font-bold text-[#2D2825] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>2. Payment Gateway</span>
                    <span className="text-[11px] text-emerald-800 font-mono flex items-center gap-1 font-normal">
                      <Lock className="w-3 h-3" />
                      256-Bit SSL
                    </span>
                  </h3>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#2D2825] bg-[#EAE0D3] text-[#2D2825]'
                          : 'border-[#DECFC0] bg-[#F7F2EB] text-[#635952] hover:bg-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple-pay')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'apple-pay'
                          ? 'border-[#2D2825] bg-[#EAE0D3] text-[#2D2825]'
                          : 'border-[#DECFC0] bg-[#F7F2EB] text-[#635952] hover:bg-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Apple / G-Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#2D2825] bg-[#EAE0D3] text-[#2D2825]'
                          : 'border-[#DECFC0] bg-[#F7F2EB] text-[#635952] hover:bg-white'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Pay on Delivery</span>
                    </button>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-[#F5EDE2] rounded-2xl border border-[#DFD1C1] space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4532 •••• •••• 8821"
                            maxLength={19}
                            className="w-full pl-3 pr-10 py-2 text-xs font-mono bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                          />
                          <CreditCard className="w-4 h-4 text-[#9C8F85] absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="08/28"
                            maxLength={5}
                            className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.substring(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#524842] uppercase mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          required
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          placeholder="Elena Vance"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Digital Wallet Option */}
                  {paymentMethod === 'apple-pay' && (
                    <div className="p-6 bg-[#F5EDE2] rounded-2xl border border-[#DFD1C1] text-center space-y-3">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-[#524842]">
                        Biometric one-touch payment will authenticate your verified shipping address and stored Apple Pay / Google Wallet card.
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-800">
                        Ready for instant 1-Click purchase
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery option */}
                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-[#F5EDE2] rounded-2xl border border-[#DFD1C1] text-xs text-[#524842] space-y-2">
                      <div className="font-semibold text-[#2D2825]">
                        Pay on Artisan Parcel Handover
                      </div>
                      <p>
                        Inspect your hand-crocheted parcel before paying. Our courier accepts card or cash upon doorstep receipt.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Order Summary & Review: 5 cols */}
              <div className="lg:col-span-5 bg-[#F4EDE2] p-6 rounded-2xl border border-[#DFD1C1] flex flex-col justify-between space-y-6">
                
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#2D2825] uppercase tracking-wider mb-3">
                    Order Summary ({cart.length} items)
                  </h3>

                  {/* Item mini list */}
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}`}
                        className="flex items-center justify-between text-xs py-1 border-b border-[#E3D6C5]/60"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-8 h-8 rounded-md object-cover border border-[#D8C7B5]"
                          />
                          <div>
                            <div className="font-semibold text-[#2D2825] line-clamp-1">
                              {item.product.name}
                            </div>
                            <div className="text-[10px] text-[#7B7068]">
                              Qty: {item.quantity} · {item.selectedColor}
                            </div>
                          </div>
                        </div>

                        <span className="font-mono font-bold text-[#2D2825]">
                          ₹{(item.product.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5C524C] pt-4 mt-2 border-t border-[#DFCBB9]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#2D2825]">₹{cartSubtotal.toFixed(0)}</span>
                    </div>

                    {discountRate > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount ({promoCodeApplied})</span>
                        <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {giftWrapFee > 0 && (
                      <div className="flex justify-between text-[#8C431E]">
                        <span>Complimentary Gift Box & Twine</span>
                        <span className="font-mono">+₹{giftWrapFee}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Carbon-Neutral Delivery</span>
                      <span className="font-mono text-[#2D2825]">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-serif font-bold text-[#2D2825] pt-3 border-t border-[#DFCBB9]">
                      <span>Grand Total</span>
                      <span className="font-mono tabular-nums">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#B25329] hover:bg-[#973F19] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Pay ₹{finalTotal.toFixed(2)}</span>
                  </button>

                  <div className="text-[11px] text-center text-[#7B7068] leading-tight">
                    By confirming order, you agree to our 30-day gentle heirloom guarantee.
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
