import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { products } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'craft-hours'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [materialFilter, setMaterialFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'small-crochet', label: 'Small Crochet Charms' },
    { id: 'cards-letters', label: 'Cards & Vintage Letters' },
    { id: 'blankets', label: 'Heirloom Throws' },
    { id: 'amigurumi', label: 'Amigurumi Keepsakes' },
    { id: 'wearables', label: 'Wearables & Totes' },
    { id: 'spa-gifts', label: 'Spa & Gift Sets' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // In stock
      if (inStockOnly && (!prod.inStock || prod.stockCount <= 0)) {
        return false;
      }
      // Material filter
      if (materialFilter !== 'all') {
        if (!prod.material.toLowerCase().includes(materialFilter.toLowerCase())) {
          return false;
        }
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchSub = prod.subtitle.toLowerCase().includes(q);
        const matchDesc = prod.description.toLowerCase().includes(q);
        const matchMat = prod.material.toLowerCase().includes(q);
        return matchName || matchSub || matchDesc || matchMat;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'craft-hours') return b.craftingTimeHours - a.craftingTimeHours;
      return 0; // featured default
    });
  }, [products, selectedCategory, inStockOnly, materialFilter, searchQuery, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setMaterialFilter('all');
  };

  return (
    <section id="catalog-section" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#8C5E43] uppercase tracking-wider mb-1">
              Curated Craft Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#231E1B]">
              Handmade with Quiet Intention
            </h2>
          </div>

          <div className="text-xs text-[#7B7068] font-mono">
            Showing {filteredProducts.length} of {products.length} catalog items
          </div>
        </div>

        {/* Filter Bar Controls */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#EADBCC]">
          
          {/* Top row: Category segmented controls & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Functional Segmented Button Tabs (Permitted for interactive filter controls) */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#F1EAE0] rounded-xl border border-[#E5DACD]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-white text-[#2D2825] shadow-xs'
                      : 'text-[#635952] hover:text-[#2D2825]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#9C8F85] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search yarn, items, gifts..."
                className="w-full pl-10 pr-4 py-2 text-xs text-[#2D2825] bg-[#F7F2EB] hover:bg-white focus:bg-white border border-[#E0D4C5] focus:border-[#B25329] focus:outline-none rounded-xl transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9C8F85] hover:text-[#2D2825]"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Secondary row: Material, Stock filter, Sort dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#524842]">
            <div className="flex flex-wrap items-center gap-3">
              {/* Material filter select */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#7B7068]">Fiber:</span>
                <select
                  value={materialFilter}
                  onChange={(e) => setMaterialFilter(e.target.value)}
                  className="bg-[#F7F2EB] border border-[#E0D4C5] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2825] focus:outline-none focus:border-[#B25329]"
                >
                  <option value="all">All Natural Fibers</option>
                  <option value="wool">Highland Wool</option>
                  <option value="cotton">Organic Cotton</option>
                  <option value="bamboo">Baby Bamboo</option>
                </select>
              </div>

              {/* In stock toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#C4B7A8] text-[#B25329] focus:ring-0 w-3.5 h-3.5 accent-[#B25329]"
                />
                <span>Ready to Ship in 24h</span>
              </label>

              {/* Reset if active filters */}
              {(selectedCategory !== 'all' || searchQuery || materialFilter !== 'all' || inStockOnly) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[#8C431E] hover:underline transition-all ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* Sort by dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8077]" />
              <span className="text-[#7B7068]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F2EB] border border-[#E0D4C5] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2825] focus:outline-none focus:border-[#B25329]"
              >
                <option value="featured">Artisan Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="craft-hours">Longest Craft Hours</option>
              </select>
            </div>

          </div>

        </div>

        {/* Product Grid: 3-column desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#F5ECE1]/60 rounded-2xl border border-dashed border-[#DFD1C2] p-8 max-w-xl mx-auto">
            <h3 className="text-lg font-serif font-bold text-[#2D2825] mb-2">
              No matching handcrafted creations
            </h3>
            <p className="text-xs text-[#635952] mb-6">
              We couldn't find items matching your search criteria. Try clearing filters or submit a custom order request for a personalized piece.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2D2825] rounded-lg hover:bg-[#403833] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
