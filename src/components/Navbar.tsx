import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Search, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onNavigateStory?: () => void;
  onNavigateReviews?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onNavigateStory,
  onNavigateReviews
}) => {
  const { cartTotalCount, wishlist, openCart, openCustomOrder } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReviewsClick = () => {
    if (onNavigateReviews) onNavigateReviews();
    setMobileMenuOpen(false);
    const reviewsEl = document.getElementById('reviews-section');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoryClick = () => {
    if (onNavigateStory) onNavigateStory();
    setMobileMenuOpen(false);
    const storyEl = document.getElementById('story-section');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top promotional bar - slim, restrained */}
      <div className="bg-[#EFE7DC] border-b border-[#E3D7C8] px-4 py-2 text-center text-xs text-[#5C4A3E] font-medium tracking-wide">
        Complimentary gift wrap & handwritten botanical note on all orders · Free shipping across India over ₹999
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCC] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#2D2825] hover:text-[#B25329] transition-colors flex items-center gap-2"
          >
            <span>Loop Love</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A423D]">
            <button
              onClick={() => handleCategoryClick('all')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap"
            >
              Shop All
            </button>
            <button
              onClick={() => handleCategoryClick('small-crochet')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap text-[#B25329]"
            >
              Small Crochet
            </button>
            <button
              onClick={() => handleCategoryClick('cards-letters')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap text-[#8C431E]"
            >
              Cards & Vintage Letters
            </button>
            <button
              onClick={() => handleCategoryClick('blankets')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap"
            >
              Heirloom Throws
            </button>
            <button
              onClick={() => handleCategoryClick('amigurumi')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap"
            >
              Amigurumi
            </button>
            <button
              onClick={() => handleCategoryClick('spa-gifts')}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap"
            >
              Gift Sets
            </button>
            <button
              onClick={handleReviewsClick}
              className="hover:text-[#B25329] transition-colors whitespace-nowrap"
            >
              Community Praise
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Custom Request Trigger */}
            <button
              onClick={openCustomOrder}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#8C3C1B] bg-[#F4E9DE] hover:bg-[#EAD9C8] border border-[#DFCBB9] rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B25329]" />
              <span>Custom Order</span>
            </button>

            {/* Wishlist count link */}
            <button
              onClick={() => {
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Saved items"
              className="relative p-2.5 text-[#5C524C] hover:text-[#2D2825] transition-colors rounded-lg hover:bg-[#F2EBE1]"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C86D51] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-lg transition-colors shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#B25329] text-white px-1.5 py-0.2 rounded text-[11px] font-mono font-medium">
                {cartTotalCount}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5C524C] lg:hidden rounded-lg hover:bg-[#F2EBE1]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EADBCC] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#4A423D]">
              <button
                onClick={() => handleCategoryClick('all')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1]"
              >
                All Products
              </button>
              <button
                onClick={() => handleCategoryClick('small-crochet')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1] text-[#B25329] font-semibold"
              >
                Small Crochet Charms
              </button>
              <button
                onClick={() => handleCategoryClick('cards-letters')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1] text-[#8C431E] font-semibold"
              >
                Cards & Vintage Letters
              </button>
              <button
                onClick={() => handleCategoryClick('blankets')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1]"
              >
                Heirloom Throws
              </button>
              <button
                onClick={() => handleCategoryClick('amigurumi')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1]"
              >
                Amigurumi Keepsakes
              </button>
              <button
                onClick={() => handleCategoryClick('spa-gifts')}
                className="text-left px-3 py-2 rounded hover:bg-[#F2EBE1]"
              >
                Spa & Gift Sets
              </button>
            </div>

            <div className="pt-2 border-t border-[#EADBCC] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCustomOrder();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#8C3C1B] bg-[#F4E9DE] rounded-lg border border-[#DFCBB9]"
              >
                Request Custom Piece / Monogram
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
