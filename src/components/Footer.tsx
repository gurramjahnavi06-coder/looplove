import React, { useState } from 'react';
import { Mail, Check, Heart, Instagram, ExternalLink } from 'lucide-react';
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

            {/* Instagram Accounts Connection */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://www.instagram.com/loop_love.store/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#332B25] hover:bg-[#3F352E] text-white border border-[#483B32] transition-colors text-xs group"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#FF543E] via-[#DE0043] to-[#7B008B] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-[10px] text-[#A89A8E] leading-none">Studio Storefront</div>
                  <div className="font-semibold text-white group-hover:text-[#CF9943] transition-colors">@loop_love.store</div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#A89A8E] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://www.instagram.com/_jaan_u_1423/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#2A231F] hover:bg-[#382E28] text-white border border-[#443830] transition-colors text-xs group"
              >
                <div className="w-6 h-6 rounded-lg bg-[#B25329] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-[10px] text-[#A89A8E] leading-none">Owner & Artisan</div>
                  <div className="font-semibold text-[#E5C398] group-hover:text-white transition-colors">@_jaan_u_1423</div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#A89A8E] group-hover:translate-x-0.5 transition-transform" />
              </a>
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
                  Small Crochet Charms & Bookmarks
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
                  Cards & Vintage Letter Keepsakes
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
                <a
                  href="https://www.instagram.com/loop_love.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3 h-3 text-[#EAA937]" />
                  <span>Instagram: @loop_love.store</span>
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
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© {new Date().getFullYear()} Loop Love Studio LLC.</span>
            <span>Handcrafted with love by founder & artisan</span>
            <a
              href="https://www.instagram.com/_jaan_u_1423/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E0D5CA] hover:text-[#CF9943] underline font-medium"
            >
              @_jaan_u_1423
            </a>
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
