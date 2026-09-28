import React from 'react';
import { Feather, HeartHandshake, Sparkles, Shield, Compass, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CraftStorySection: React.FC = () => {
  const { openCustomOrder } = useShop();

  return (
    <section id="story-section" className="py-20 bg-[#FAF7F2] border-t border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold text-[#8C5E43] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Feather className="w-4 h-4" />
            <span>The Slow Craft Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#231E1B]">
            From Ethical Fleece to Heirlooms
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524C] leading-relaxed">
            In an era of disposable factory garments, we make only 12 to 18 pieces each week. Every loop is pulled with patient fingers, mindful breathing, and deep reverence for the craft.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-[#F6EFE5] p-8 rounded-3xl border border-[#E3D6C5] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EADBCC] text-[#8C431E] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2D2825]">
                100% Natural Organic Fibers
              </h3>
              <p className="text-xs text-[#5A4F48] leading-relaxed">
                Zero microplastics, zero acrylic yarn. We partner directly with ethical Peruvian highland cooperatives and GOTS-certified Aegean cotton growers who practice gentle non-mulesed farming.
              </p>
            </div>
            <div className="text-[11px] text-[#7B7068] font-mono pt-4 border-t border-[#DFCBB9]">
              Certified OEKO-TEX Standard 100 Class I
            </div>
          </div>

          <div className="bg-[#F6EFE5] p-8 rounded-3xl border border-[#E3D6C5] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EADBCC] text-[#8C431E] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2D2825]">
                Fair Artisan Livelihoods
              </h3>
              <p className="text-xs text-[#5A4F48] leading-relaxed">
                Our maker collective includes multigenerational crocheters in rural Vermont and New England. Every commission pays above-average living craft wages, honoring traditional women-led craftsmanship.
              </p>
            </div>
            <div className="text-[11px] text-[#7B7068] font-mono pt-4 border-t border-[#DFCBB9]">
              Signed by the Artisan on Every Label
            </div>
          </div>

          <div className="bg-[#F6EFE5] p-8 rounded-3xl border border-[#E3D6C5] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EADBCC] text-[#8C431E] flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2D2825]">
                Lifetime Repair Promise
              </h3>
              <p className="text-xs text-[#5A4F48] leading-relaxed">
                Heirlooms are meant to be lived with. If a curious kitten pulls a snag or a seam loosens over the years, ship your blanket back to our studio and our hands will re-weave it free of charge.
              </p>
            </div>
            <div className="text-[11px] text-[#7B7068] font-mono pt-4 border-t border-[#DFCBB9]">
              Heirloom Warranty Included with Every Piece
            </div>
          </div>

        </div>

        {/* Studio Banner with Custom Order Prompt */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2D2825] text-[#FAF7F2] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="text-xs uppercase font-semibold text-[#CF9943] tracking-wider">
              Special Keepsake Occasions
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white max-w-xl">
              Celebrating a birth, wedding, or quiet personal milestone?
            </h3>
            <p className="text-xs sm:text-sm text-[#BFB3A8] max-w-xl leading-relaxed">
              We specialize in custom monogrammed blankets and amigurumi companions sculpted to your exact family palette and dimensions.
            </p>
          </div>

          <button
            onClick={openCustomOrder}
            className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#2D2825] bg-[#EFE4D6] hover:bg-white rounded-xl transition-colors shrink-0 flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#B25329]" />
            <span>Commission a Custom Keepsake</span>
          </button>
        </div>

      </div>
    </section>
  );
};
