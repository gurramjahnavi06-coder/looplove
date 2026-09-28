import React, { useState } from 'react';
import { Mail, Check, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { openCustomOrder } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241E1B] text-[#E0D5CA] border-t border-[#3D332D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D332D]">
          
          {/* Brand info: 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h3
              onClick={scrollToTop}
              className="text-2xl font-serif font-bold text-white cursor-pointer hover:text-[#CF9943] transition-colors inline-block"
            >
              Loop Love
            </h3>
            <p className="text-xs text-[#A89A8E] leading-relaxed max-w-sm">
              Artisan crochet studio based in the Green Mountains of Vermont. Slow-crafted blankets, woodland plushies, and custom heirloom gifts hooked with certified natural fibers.
            </p>
            <div className="text-xs text-[#8C7E72] font-mono">
              Workshop: 420 Pine Needle Mill, Burlington, VT 05401
            </div>
          </div>

          {/* Quick links: 1 col */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Artisan Collections
            </div>
            <ul className="space-y-2 text-[#A89A8E]">
              <li>
                <a
                  href="#catalog-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Heirloom Waffle Throws
                </a>
              </li>
              <li>
                <a
                  href="#catalog-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Amigurumi Keepsakes
                </a>
              </li>
              <li>
                <a
                  href="#catalog-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Granny Square Totes
                </a>
              </li>
              <li>
                <a
                  href="#catalog-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Botanical Spa Gift Baskets
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care: 1 col */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Customer Care
            </div>
            <ul className="space-y-2 text-[#A89A8E]">
              <li>
                <button
                  onClick={openCustomOrder}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Order Commissions
                </button>
              </li>
              <li>
                <a
                  href="#reviews-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Community Reviews
                </a>
              </li>
              <li>
                <span className="text-[#8C7E72]">Yarn Care & Blocking Guide</span>
              </li>
              <li>
                <span className="text-[#8C7E72]">Free Lifetime Wool Repair</span>
              </li>
            </ul>
          </div>

          {/* Newsletter: 1 col */}
          <div className="space-y-3 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Studio Dispatch
            </div>
            <p className="text-[#A89A8E] leading-relaxed text-[11px]">
              Receive announcements when fresh dye batches and limited seasonal pieces are released.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#332B25] text-emerald-400 rounded-xl border border-[#483B32] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Welcome to our studio circle! Use code COZY10 for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-3 py-2 text-xs bg-[#1C1715] border border-[#3E332C] rounded-xl text-white focus:outline-none focus:border-[#CF9943]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold text-[#241E1B] bg-[#E0D5CA] hover:bg-white rounded-xl transition-colors"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B6E64] gap-4">
          <div>
            © {new Date().getFullYear()} Loop Love Studio LLC. All rights reserved. Handcrafted with non-toxic fibers.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Plastic-Free Packaging</span>
            <span aria-hidden="true">·</span>
            <span>Carbon-Neutral Postal Transit</span>
            <span aria-hidden="true">·</span>
            <span>GOTS Certified Fibers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
