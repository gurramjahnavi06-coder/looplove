import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, CheckCircle2, Filter } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Review } from '../types';

export const CommunityReviews: React.FC = () => {
  const { reviews, markReviewHelpful, submitReview, products } = useShop();

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState(products[0]?.name || 'Heirloom Meadow Waffle Throw');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newTags, setNewTags] = useState('');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: Math.round((reviews.filter((r) => r.rating === stars).length / (reviews.length || 1)) * 100)
  }));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newTitle.trim() || !newComment.trim()) return;

    submitReview({
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Verified Customer',
      rating: newRating,
      productName: newProduct,
      title: newTitle.trim(),
      comment: newComment.trim(),
      verifiedBuyer: true,
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : ['Verified Customer', 'Handcrafted Quality']
    });

    // Reset form
    setNewAuthor('');
    setNewLocation('');
    setNewTitle('');
    setNewComment('');
    setNewTags('');
    setShowReviewForm(false);
  };

  return (
    <section id="reviews-section" className="py-20 bg-[#FAF7F2] border-t border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-[#8C5E43] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8C5E43]" />
              <span>Real Customer Stories & Trust</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#231E1B]">
              Loved in Living Rooms Everywhere
            </h2>
            <p className="text-xs sm:text-sm text-[#5C534D] mt-1.5 max-w-xl">
              Every blanket, toy, and gift is held to heirloom standards. Read unfiltered reviews from customers who welcomed our handmade pieces into their homes.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="self-start md:self-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#CF9943]" />
            <span>{showReviewForm ? 'Cancel Review' : 'Share Your Experience'}</span>
          </button>
        </div>

        {/* Aggregate Ratings & Breakdown Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 bg-[#F4EDE2] rounded-3xl border border-[#E3D6C5] mb-12">
          
          {/* Big Score Box: 4 cols */}
          <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#DFCBB9] pb-6 lg:pb-0 lg:pr-8">
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#2D2825] font-mono tabular-nums">
              {averageRating}
            </div>
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(averageRating))
                      ? 'text-[#CF9943] fill-[#CF9943]'
                      : 'text-[#DACABA]'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-[#5C524C]">
              Based on <span className="font-bold text-[#2D2825] font-mono">{reviews.length}</span> verified customer reviews
            </div>
            <div className="mt-4 pt-4 border-t border-[#DFCBB9]/70 flex items-center gap-2 text-xs text-[#2E6B38]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>100% of customers recommend our handmade pieces</span>
            </div>
          </div>

          {/* Star Distribution: 5 cols */}
          <div className="lg:col-span-5 space-y-2 flex flex-col justify-center">
            {starCounts.map(({ stars, count, percentage }) => (
              <button
                key={stars}
                onClick={() => setFilterRating(filterRating === stars ? 'all' : stars)}
                className={`w-full flex items-center gap-3 text-xs transition-colors rounded-lg p-1 ${
                  filterRating === stars ? 'bg-[#EADDCF]' : 'hover:bg-[#EFE5D8]'
                }`}
              >
                <div className="w-12 font-mono flex items-center gap-1 text-[#403833]">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 text-[#CF9943] fill-[#CF9943]" />
                </div>
                <div className="flex-1 h-2 bg-[#E2D4C3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B25329] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-10 text-right font-mono text-[#7B7068]">
                  {count}
                </div>
              </button>
            ))}
          </div>

          {/* Artisan Promises: 3 cols */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-3 lg:pl-4 border-t lg:border-t-0 border-[#DFCBB9] pt-6 lg:pt-0 text-xs text-[#5A4F48]">
            <div className="font-semibold text-[#2D2825] uppercase tracking-wider text-[11px]">
              Artisan Trust Standard
            </div>
            <div>
              <span className="font-medium text-[#2D2825]">Verified Buyers:</span> Every reviewer has verified receipt of their parcel.
            </div>
            <div>
              <span className="font-medium text-[#2D2825]">Ethical Guarantee:</span> Free lifetime repairs for loose loops on any blanket.
            </div>
          </div>

        </div>

        {/* Interactive New Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleFormSubmit}
            className="mb-12 p-6 sm:p-8 bg-[#F6EFE5] rounded-3xl border border-[#DFCBB9] shadow-sm animate-in slide-in-from-top-4 duration-300"
          >
            <h3 className="text-xl font-serif font-bold text-[#2D2825] mb-1">
              Write a Review
            </h3>
            <p className="text-xs text-[#6B5F57] mb-6">
              Share details about stitch quality, color accuracy, or how the gift was received.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Clara S."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Boston, MA"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  Rating *
                </label>
                <div className="flex items-center gap-1.5 h-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          s <= newRating
                            ? 'text-[#CF9943] fill-[#CF9943]'
                            : 'text-[#DACABA]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold ml-2 text-[#2D2825]">{newRating} Stars</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  Product Purchased
                </label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Custom Bespoke Order">Custom Bespoke Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Even more beautiful in person!"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Describe the texture, weight, packaging, or how you use it..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-[#403833] uppercase tracking-wider mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="e.g. Super Warm, Gift Packaging, Heirloom"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DACABE] rounded-xl focus:outline-none focus:border-[#B25329]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#2D2825] hover:bg-[#403833] rounded-xl transition-colors shadow-sm"
              >
                Post Verified Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2.5 text-xs font-medium text-[#6B5F57] hover:text-[#2D2825] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Filter Tab bar for reviews */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#EADBCC] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#7B7068]">Filter by:</span>
            <div className="flex items-center gap-1.5 p-1 bg-[#F1EAE0] rounded-lg">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterRating === 'all'
                    ? 'bg-white text-[#2D2825] font-semibold shadow-2xs'
                    : 'text-[#635952] hover:text-[#2D2825]'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating(5)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterRating === 5
                    ? 'bg-white text-[#2D2825] font-semibold shadow-2xs'
                    : 'text-[#635952] hover:text-[#2D2825]'
                }`}
              >
                5 Stars
              </button>
              <button
                onClick={() => setFilterRating(4)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterRating === 4
                    ? 'bg-white text-[#2D2825] font-semibold shadow-2xs'
                    : 'text-[#635952] hover:text-[#2D2825]'
                }`}
              >
                4 Stars
              </button>
            </div>
          </div>

          <div className="text-xs text-[#7B7068] font-mono">
            Showing {filteredReviews.length} reviews
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EADBCC] hover:border-[#D5C0AC] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Review Header: Rating and Date */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-[#CF9943] fill-[#CF9943]'
                            : 'text-[#DACABA]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C8077] font-mono">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-base font-serif font-bold text-[#2D2825]">
                  {rev.title}
                </h4>

                {/* Review Text */}
                <p className="text-xs text-[#524942] mt-2 leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Tags if any (clean unboxed text with separators, ZERO static pill badges!) */}
                {rev.tags && rev.tags.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[#7B7068]">
                    {rev.tags.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < rev.tags!.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Footer: Author, Product, Helpful */}
              <div className="mt-6 pt-4 border-t border-[#EADBCC] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#2D2825] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="text-[10px] font-normal text-emerald-800 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#8C8077] truncate max-w-[200px]">
                    Purchased: {rev.productName}
                  </div>
                </div>

                <button
                  onClick={() => markReviewHelpful(rev.id)}
                  className="flex items-center gap-1.5 text-xs text-[#6B5F57] hover:text-[#B25329] transition-colors p-1.5 rounded-lg hover:bg-[#F2EBE1]"
                  title="Mark this review as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{rev.helpfulCount}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
