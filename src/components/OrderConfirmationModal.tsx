import React from 'react';
import { CheckCircle2, Package, Printer, Sparkles, MapPin, Truck, Calendar, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const { activeReceipt, closeReceiptModal } = useShop();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl border border-[#EADBCC] w-full max-w-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBCC] bg-[#F7F2EB]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E43]">
            Verified Artisan Receipt
          </div>
          <button
            onClick={closeReceiptModal}
            className="p-1.5 text-[#6B5F57] hover:text-[#2D2825] rounded-full hover:bg-[#ECE3D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#E8F0E5] text-[#2E6B38] rounded-full flex items-center justify-center mx-auto border border-[#C6DAC1]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#231E1B]">
              Order Confirmed & Booked!
            </h2>
            <p className="text-xs sm:text-sm text-[#5C524C]">
              Thank you, <span className="font-semibold text-[#2D2825]">{activeReceipt.customerName}</span>. Your handmade piece is officially assigned to our studio workshop.
            </p>
            <div className="inline-block px-3 py-1 bg-[#F1E7DC] rounded-md font-mono text-xs font-bold text-[#8C3C1B] border border-[#DFCBB9]">
              Order #{activeReceipt.orderId}
            </div>
          </div>

          {/* Live Artisan Progress Timeline */}
          <div className="p-4 bg-[#F4EDE2] rounded-2xl border border-[#E0D3C3] space-y-3">
            <div className="text-xs font-serif font-bold text-[#2D2825] uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#B25329]" />
              <span>Handcrafting & Delivery Stages</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2.5 bg-white rounded-xl border border-[#D5C6B5] text-[#2E6B38] font-medium shadow-2xs">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto mb-1" />
                <span>1. Order Authenticated</span>
              </div>
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#DFCBB9] text-[#8C431E] font-medium animate-pulse">
                <div className="w-2 h-2 rounded-full bg-[#B25329] mx-auto mb-1" />
                <span>2. Artisan Yarn Prep</span>
              </div>
              <div className="p-2.5 bg-[#F7F2EB] rounded-xl border border-[#EADBCC] text-[#7B7068]">
                <div className="w-2 h-2 rounded-full bg-[#DACABA] mx-auto mb-1" />
                <span>3. Wrapped & Shipped</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-[#EADBCC] space-y-1">
              <div className="text-[#7B7068] font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B25329]" />
                <span>Shipping Destination</span>
              </div>
              <div className="font-semibold text-[#2D2825]">{activeReceipt.customerName}</div>
              <div className="text-[#5C524C]">{activeReceipt.shippingAddress.street}</div>
              <div className="text-[#5C524C]">
                {activeReceipt.shippingAddress.city}, {activeReceipt.shippingAddress.state} {activeReceipt.shippingAddress.postalCode}
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#EADBCC] space-y-1">
              <div className="text-[#7B7068] font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B25329]" />
                <span>Estimated Arrival</span>
              </div>
              <div className="font-semibold text-[#2D2825]">{activeReceipt.estimatedDelivery}</div>
              <div className="text-[#5C524C]">Payment Method: {activeReceipt.paymentMethod}</div>
              <div className="text-[11px] text-emerald-800">Payment Processed Successfully</div>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCC] space-y-2">
            <div className="text-xs font-semibold text-[#403833] uppercase tracking-wider pb-2 border-b border-[#EADBCC]">
              Purchased Creations
            </div>
            {activeReceipt.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1">
                <div>
                  <span className="font-medium text-[#2D2825]">{item.product.name}</span>
                  <span className="text-[#7B7068] ml-2">
                    ({item.selectedColor}, x{item.quantity})
                  </span>
                  {item.giftWrap && (
                    <span className="block text-[10px] text-[#8C431E]">
                      + Wrapped with custom botanical note
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-[#2D2825]">
                  ${(item.product.price * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-[#EADBCC] space-y-1 text-xs text-[#5C524C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">${activeReceipt.subtotal.toFixed(0)}</span>
              </div>
              {activeReceipt.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono">-${activeReceipt.discount.toFixed(2)}</span>
                </div>
              )}
              {activeReceipt.giftWrapFee > 0 && (
                <div className="flex justify-between text-[#8C431E]">
                  <span>Artisan Gift Wrapping</span>
                  <span className="font-mono">+${activeReceipt.giftWrapFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono">
                  {activeReceipt.shipping === 0 ? 'FREE' : `$${activeReceipt.shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2D2825] pt-2 border-t border-[#EADBCC]">
                <span>Total Paid</span>
                <span className="font-serif font-mono">${activeReceipt.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 text-xs font-semibold text-[#2D2825] bg-[#F1EAE0] hover:bg-[#E5DACD] border border-[#DFCBB9] rounded-xl transition-colors flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={closeReceiptModal}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors text-center"
            >
              Back to Storefront
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
