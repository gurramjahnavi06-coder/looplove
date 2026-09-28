import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Gift, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    shippingFee,
    discountRate,
    promoCodeApplied,
    applyPromoCode,
    openCheckout
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = cartSubtotal * discountRate;
  const giftWrapFee = cart.some((i) => i.giftWrap) ? 5 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#EADBCC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EADBCC] bg-[#F7F2EB]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2D2825]">
              Your Artisan Basket
            </h2>
            <div className="text-xs text-[#7B7068]">
              {cart.length === 0 ? 'Empty basket' : `${cart.length} item(s) selected`}
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#6B5F57] hover:text-[#2D2825] rounded-full hover:bg-[#ECE3D5] transition-colors"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#F2ECE1] border-b border-[#E5DACD] text-xs">
          <div className="flex items-center justify-between text-[#5C524C] mb-1.5">
            <span>
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-[#2E6B38] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>You've unlocked Free Carbon-Neutral Shipping!</span>
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#2D2825] font-mono">${amountNeededForFreeShipping.toFixed(0)}</strong> more for complimentary delivery
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] font-medium text-[#7B7068]">
              ${freeShippingThreshold} threshold
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E2D4C3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B25329] rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE2] border border-[#DFCBB9] flex items-center justify-center mx-auto text-[#B25329]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D2825]">
                Your basket is empty
              </h3>
              <p className="text-xs text-[#7B7068] max-w-xs mx-auto">
                Explore our slow-crafted crochet collections or design your own bespoke heirloom piece.
              </p>
              <button
                onClick={closeCart}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EADBCC] shadow-2xs"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F3ECE2] shrink-0 border border-[#E3D6C5]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#2D2825] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#7B7068] mt-0.5">
                        Shade: <span className="text-[#2D2825]">{item.selectedColor}</span>
                      </div>
                      {item.giftWrap && (
                        <div className="text-[10px] text-[#8C431E] flex items-center gap-1 mt-0.5">
                          <Gift className="w-3 h-3" />
                          <span>Gift packaged</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-[#998C82] hover:text-[#B25329] transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DECFC0] rounded-lg bg-[#FAF7F2] overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                        className="px-2 py-0.5 text-xs hover:bg-[#EADBCC] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                        className="px-2 py-0.5 text-xs hover:bg-[#EADBCC] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#2D2825] font-mono tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Pricing & Checkout) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EADBCC] bg-[#F7F2EB] space-y-4">
            
            {/* Promo Code input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#9C8F85] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon (e.g. COZY10)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#DACABE] rounded-lg focus:outline-none focus:border-[#B25329] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-[#2D2825] bg-[#EAE0D3] hover:bg-[#DECFC0] rounded-lg transition-colors border border-[#D5C2B0]"
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <div
                  className={`text-[11px] ${
                    promoMsg.success ? 'text-emerald-700' : 'text-[#B25329]'
                  }`}
                >
                  {promoMsg.message}
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C524C] pt-2 border-t border-[#EADBCC]">
              <div className="flex justify-between">
                <span>Basket Subtotal</span>
                <span className="font-mono text-[#2D2825]">${cartSubtotal.toFixed(0)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({promoCodeApplied})</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {giftWrapFee > 0 && (
                <div className="flex justify-between text-[#8C431E]">
                  <span>Artisan Gift Wrapping</span>
                  <span className="font-mono">+${giftWrapFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-[#2D2825]">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2D2825] pt-2 border-t border-[#EADBCC]">
                <span>Total Due</span>
                <span className="font-serif font-mono tabular-nums text-base">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={openCheckout}
              className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7B7068]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>256-Bit SSL Encrypted & PCI-DSS Secure</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
