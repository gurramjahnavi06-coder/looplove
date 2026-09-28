import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Feather } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { openCustomOrder } = useShop();

  const handleExplore = () => {
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EADBCC] pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column: 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E43]">
              <span>Small Batch Artisanal Studio</span>
              <span aria-hidden="true">·</span>
              <span>Vermont, USA</span>
              <span aria-hidden="true">·</span>
              <span>100% Plastic-Free Yarn</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#231E1B] leading-[1.12] tracking-tight [text-wrap:balance]">
              Slow-crafted yarn heirlooms for homes filled with warmth.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A514B] leading-relaxed max-w-2xl">
              Every blanket, amigurumi keepsake, and botanical gift is hooked stitch-by-stitch using certified Peruvian Highland wool and combed organic cotton. Made to comfort, cherish, and hand down through generations.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2.5 group"
              >
                <span>Browse Handmade Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={openCustomOrder}
                className="px-6 py-3.5 text-sm font-semibold text-[#6B371E] bg-[#F5EBE1] hover:bg-[#EBDEC0] border border-[#D9C4AF] rounded-xl transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#B25329]" />
                <span>Request Custom Piece</span>
              </button>
            </div>

            {/* Claim to proof adjacency: unboxed trust markers */}
            <div className="pt-6 border-t border-[#EADBCC] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#2D2825] font-mono tabular-nums">
                  18+ hrs
                </div>
                <div className="text-xs text-[#736860] mt-0.5">Average time per heirloom piece</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#2D2825] font-mono tabular-nums">
                  4.9 / 5.0
                </div>
                <div className="text-xs text-[#736860] mt-0.5">Community customer rating</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#2D2825] font-mono tabular-nums">
                  100% GOTS
                </div>
                <div className="text-xs text-[#736860] mt-0.5">Pure certified organic fibers</div>
              </div>
            </div>

          </div>

          {/* Right Showcase Media Column: 5 Cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4D5C3] bg-[#F3ECE2] group">
              <img
                src="/src/assets/images/hero_crochet_artisan_studio_1790578332827.jpg"
                alt="Artisan handmade crochet workshop table with merino wool and wooden hooks"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Media floating caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E8DFD5] text-[#2D2825]">
                <div className="flex items-center justify-between text-xs font-medium text-[#736860] mb-1">
                  <span>Current Batch in Workshop</span>
                  <span className="text-[#B25329] font-mono">Autumn Hearth Series</span>
                </div>
                <p className="text-sm font-serif font-semibold text-[#2D2825]">
                  Hand-spun Peruvian highland wool throws currently on the blocking boards.
                </p>
              </div>
            </div>

            {/* Subtle decorative artisan stamp */}
            <div className="hidden sm:flex absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#EFE4D6] border-2 border-dashed border-[#B89679] items-center justify-center p-2 text-center text-[10px] font-semibold text-[#664630] uppercase tracking-wider rotate-12 shadow-sm">
              Hand Stitched
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
