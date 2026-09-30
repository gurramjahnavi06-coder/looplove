import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: '/src/assets/images/crochet_meadow_throw_blanket_1790578352080.jpg',
    caption: 'Gentle morning light blocking our signature waffle throw in terracotta & oatmeal wool ☕️🍂 #LoopLoveStore',
    likes: 428,
    comments: 31,
    tag: 'Heirloom Blankets'
  },
  {
    id: 'post-2',
    image: '/src/assets/images/crochet_small_charms_bookmarks_1790581110179.jpg',
    caption: 'Pocket-sized happiness! Finishing a batch of mini strawberry keychains & sunflower bookmarks 🍓✨',
    likes: 612,
    comments: 54,
    tag: 'Small Crochet'
  },
  {
    id: 'post-3',
    image: '/src/assets/images/handmade_greeting_cards_1790581127290.jpg',
    caption: 'Deckled cotton rag paper meet miniature hand-crocheted lavender blossoms. Blank inside for your handwritten words 🌿💌',
    likes: 389,
    comments: 26,
    tag: 'Botanical Cards'
  },
  {
    id: 'post-4',
    image: '/src/assets/images/vintage_letter_keepsake_photos_1790581145853.jpg',
    caption: 'Custom calligraphy love letters on antiqued tea-stained paper with beeswax wax seals & sepia prints 🕯️🕊️',
    likes: 547,
    comments: 48,
    tag: 'Vintage Letters'
  },
  {
    id: 'post-5',
    image: '/src/assets/images/crochet_amigurumi_woodland_fox_1790578364178.jpg',
    caption: 'Bramble the forest fox ready to be bundled into an unbleached cotton parcel for a nursery in Bangalore 🦊🤎',
    likes: 721,
    comments: 63,
    tag: 'Amigurumi'
  },
  {
    id: 'post-6',
    image: '/src/assets/images/crochet_botanical_tote_bag_1790578379787.jpg',
    caption: 'Slip-stitching 13 daisy granny squares together. Sturdy organic cotton made to carry your farmers market haul 🌼🧺',
    likes: 495,
    comments: 39,
    tag: 'Market Totes'
  }
];

export const InstagramFeed: React.FC = () => {
  const instagramUrl = 'https://www.instagram.com/loop_love.store/';

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Account Connection */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#EADBCC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B25329] mb-2">
              <Instagram className="w-4 h-4" />
              <span>Studio Dispatch on Instagram</span>
            </div>
            
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#231E1B]">
                @loop_love.store
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#EAE0D3] text-[#6B4B38] px-2.5 py-0.5 rounded-full border border-[#D9C8B5]">
                <CheckCircle2 className="w-3 h-3 text-[#B25329]" />
                Official Studio
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#635952] mt-2 max-w-xl leading-relaxed">
              Peek behind the scenes in our yarn studio. Follow daily stitch reels, new dye lots, packaging ASMR, and customer unboxings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#B25329] via-[#C86D51] to-[#D47A41] hover:brightness-110 rounded-xl transition-all shadow-sm hover:shadow"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @loop_love.store</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={`${instagramUrl}direct/inbox/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#4A3E37] bg-[#EFE6DC] hover:bg-[#E4D8CB] border border-[#DFCBB9] rounded-xl transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B25329]" />
              <span>DM for Custom Orders</span>
            </a>
          </div>
        </div>

        {/* 6-Grid Instagram Post Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#EFE7DC] border border-[#DECFC0] shadow-2xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag pill */}
              <div className="absolute top-2.5 left-2.5 z-10 opacity-90 group-hover:opacity-0 transition-opacity">
                <span className="text-[10px] font-medium bg-[#241E1B]/70 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                  {post.tag}
                </span>
              </div>

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-[#241E1B]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#F7EDE2]">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@loop_love.store</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </div>

                <p className="text-[11px] text-white/95 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#E0D5CA] font-mono pt-2 border-t border-white/15">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#EAA937] fill-[#EAA937]" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Community Tag Prompt */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#F4EDE2] border border-[#DFCBB9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B25329]/10 text-[#B25329] flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#2D2825]">
                Share your unboxing & tag @loop_love.store
              </div>
              <div className="text-[11px] text-[#635952]">
                Use #LoopLoveStore on Instagram for a chance to win a monthly handmade crochet gift set.
              </div>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#8C3C1B] hover:text-[#B25329] underline underline-offset-4 flex items-center gap-1 shrink-0"
          >
            <span>Visit @loop_love.store on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
