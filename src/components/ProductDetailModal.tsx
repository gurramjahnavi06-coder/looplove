import React, { useState } from 'react';
import { X, Heart, Star, Clock, ShieldCheck, Gift, Check, Sparkles, AlertCircle, Instagram, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductModal,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openCheckout
  } = useShop();

  const product = activeProductModal;
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || 'Natural'
  );
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'maker'>('details');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, giftWrap, giftNote);
    closeProductDetail();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, giftWrap, giftNote);
    closeProductDetail();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl border border-[#EADBCC] w-full max-w-4xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBCC] bg-[#F7F2EB]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5E43]">
            Bespoke Craft Specifications
          </div>
          <button
            onClick={closeProductDetail}
            className="p-1.5 text-[#6B5F57] hover:text-[#2D2825] rounded-full hover:bg-[#ECE3D5] transition-colors"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two-column layout */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Left Column: Image & Highlights */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F0E8DC] border border-[#E3D6C5]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Stock indicator badge */}
                <div className="absolute bottom-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E3D7C8] text-xs font-medium text-[#2D2825] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {product.stockCount <= 3
                      ? `Only ${product.stockCount} left in this dye batch`
                      : `${product.stockCount} in stock & ready to ship`}
                  </span>
                </div>
              </div>

              {/* Artisan Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#F4EDE3] rounded-xl border border-[#E5DACD]">
                  <div className="text-[11px] text-[#7B7068]">Time to Hook</div>
                  <div className="text-sm font-serif font-bold text-[#2D2825] font-mono tabular-nums flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#B25329]" />
                    <span>{product.craftingTimeHours} hours</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F4EDE3] rounded-xl border border-[#E5DACD]">
                  <div className="text-[11px] text-[#7B7068]">Yarn Weight</div>
                  <div className="text-sm font-serif font-bold text-[#2D2825] mt-0.5 truncate">
                    {product.yarnWeight}
                  </div>
                </div>
              </div>

              {/* Maker Note Box */}
              <div className="p-4 bg-[#F2ECE1] rounded-xl border border-[#E3D6C5] text-xs text-[#524942] leading-relaxed">
                <div className="font-semibold text-[#2D2825] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B25329]" />
                  <span>Maker's Studio Note</span>
                </div>
                {product.makerNotes}
              </div>

            </div>

            {/* Right Column: Pricing, Specs, Customizations & Action */}
            <div className="space-y-6">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#7B7068] mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#8C5E43]">
                    {product.category.replace('-', ' ')}
                  </span>
                  
                  {/* Reviews link */}
                  <div className="flex items-center gap-1 text-[#2D2825]">
                    <Star className="w-3.5 h-3.5 text-[#CF9943] fill-[#CF9943]" />
                    <span className="font-bold font-mono">{product.rating}</span>
                    <span className="text-[#8C8077]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#231E1B]">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C534D] mt-1.5 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-[#2D2825] font-mono tabular-nums">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#998C82] line-through font-mono">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#736860]">
                    · Free shipping over ₹999
                  </span>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#403833] uppercase tracking-wider mb-2">
                  Dye Shade: <span className="text-[#8C431E] normal-case">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        selectedColor === c.name
                          ? 'border-[#2D2825] bg-[#EAE0D3] font-semibold text-[#2D2825]'
                          : 'border-[#DECFC0] bg-[#F7F2EB] text-[#635952] hover:border-[#B8A694]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className="pt-2 border-t border-[#EADBCC] space-y-4">
                
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#403833] uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#DECFC0] rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-sm hover:bg-[#F2ECE1] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold font-mono tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="px-3 py-1.5 text-sm hover:bg-[#F2ECE1] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Free Gift Packaging Toggle */}
                <div className="p-3.5 bg-[#F6EFE5] rounded-xl border border-[#E3D6C5] space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 text-[#B25329] rounded border-[#DECFC0] focus:ring-0 accent-[#B25329]"
                    />
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D2825]">
                      <Gift className="w-3.5 h-3.5 text-[#B25329]" />
                      <span>Complimentary Gift Packaging (Kraft Paper & Lavender Twine)</span>
                    </div>
                  </label>

                  {giftWrap && (
                    <div className="pt-1">
                      <input
                        type="text"
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="Write a custom calligraphy note for recipient..."
                        maxLength={120}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#DACABE] rounded-lg focus:outline-none focus:border-[#B25329]"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Add to Bag</span>
                    <span className="font-mono">· ₹{(product.price * quantity).toFixed(0)}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#B25329] hover:bg-[#99411D] rounded-xl transition-colors shadow-sm"
                  >
                    Instant Checkout
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isFavorited
                        ? 'border-[#B25329] bg-[#FAF0EA] text-[#B25329]'
                        : 'border-[#DECFC0] bg-[#F7F2EB] text-[#5A4F47] hover:bg-white'
                    }`}
                    title="Save to favorites"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

              </div>

              {/* Detailed Specs Tabbed view */}
              <div className="pt-4 border-t border-[#EADBCC]">
                <div className="flex items-center gap-4 text-xs font-semibold border-b border-[#EADBCC] pb-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`transition-colors pb-1 ${
                      activeTab === 'details'
                        ? 'text-[#B25329] border-b-2 border-[#B25329]'
                        : 'text-[#7B7068] hover:text-[#2D2825]'
                    }`}
                  >
                    Fiber & Dimensions
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`transition-colors pb-1 ${
                      activeTab === 'care'
                        ? 'text-[#B25329] border-b-2 border-[#B25329]'
                        : 'text-[#7B7068] hover:text-[#2D2825]'
                    }`}
                  >
                    Care Instructions
                  </button>
                </div>

                <div className="py-3 text-xs text-[#524842] leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-[#EEDBDB]/40">
                        <span className="text-[#7B7068]">Material Fiber:</span>
                        <span className="font-medium text-right">{product.material}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#EEDBDB]/40">
                        <span className="text-[#7B7068]">Exact Dimensions:</span>
                        <span className="font-medium font-mono text-right">{product.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#EEDBDB]/40">
                        <span className="text-[#7B7068]">Artisan Handcrafted in:</span>
                        <span className="font-medium text-right">Vermont Studio, USA</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-1.5 bg-[#F6EFE5] p-3 rounded-lg border border-[#E5DACD]">
                      <p className="font-medium text-[#2D2825]">{product.careInstructions}</p>
                      <p className="text-[11px] text-[#7B7068]">
                        Tip: Store with natural cedar blocks to preserve organic wool fibers naturally.
                      </p>
                    </div>
                  )}
                </div>

                {/* Instagram preview link */}
                <div className="pt-3 border-t border-[#EADBCC] flex items-center justify-between text-xs">
                  <span className="text-[#635952] flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#B25329]" />
                    <span>See stitch videos on Instagram:</span>
                  </span>
                  <a
                    href="https://www.instagram.com/loop_love.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#B25329] hover:underline flex items-center gap-1"
                  >
                    <span>@loop_love.store</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
