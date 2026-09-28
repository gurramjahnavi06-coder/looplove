import React from 'react';
import { Heart, Plus, Eye, Clock, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useShop();
  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group flex flex-col bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] hover:border-[#D5C0AC] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Visual Slot: 65-70% height with solid neutral background */}
      <div className="relative aspect-[4/3] w-full bg-[#F3ECE2] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Stylized CSS fallback
            const target = e.target as HTMLElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-[#ECE3D5]');
            }
          }}
        />

        {/* Wishlist Heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors backdrop-blur-md ${
            isFavorited
              ? 'bg-[#B25329] text-white'
              : 'bg-white/80 hover:bg-white text-[#5A4F47] hover:text-[#B25329]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet 1-line tag if applicable (clean unboxed or subtle label, NO loud badge sandwiches) */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#8C431E] rounded-md border border-[#E0D2C2]">
            Studio Favorite
          </div>
        )}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#40684E] rounded-md border border-[#D0DEC9]">
            New Release
          </div>
        )}

        {/* Quick View overlay trigger on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            onClick={() => openProductDetail(product)}
            className="flex-1 py-2 text-xs font-semibold text-[#2D2825] bg-[#FAF7F2] hover:bg-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details & Specs</span>
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-2 text-white bg-[#B25329] hover:bg-[#973F19] rounded-lg transition-colors shadow"
            title="Quick add to bag"
            aria-label={`Quick add ${product.name} to bag`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Quiet unboxed category & crafting time */}
          <div className="flex items-center gap-2 text-xs text-[#7B7068] mb-1.5">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#998A7F]" />
              <span className="font-mono tabular-nums">{product.craftingTimeHours}h</span> craft
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product)}
            className="text-base font-serif font-bold text-[#2D2825] hover:text-[#B25329] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short subtitle */}
          <p className="text-xs text-[#635952] line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Rating and Price Baseline */}
        <div className="pt-3 border-t border-[#EADBCC]/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#524842]">
            <Star className="w-3.5 h-3.5 text-[#CF9943] fill-[#CF9943]" />
            <span className="font-bold font-mono tabular-nums">{product.rating}</span>
            <span className="text-[#8C8077] font-mono">({product.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-[#998C82] line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-base font-bold text-[#2D2825] font-mono tabular-nums">
              ${product.price}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
