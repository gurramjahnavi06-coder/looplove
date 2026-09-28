import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Hannah M.',
    location: 'Portland, OR',
    rating: 5,
    date: '3 days ago',
    productName: 'Heirloom Meadow Waffle Throw',
    title: 'The most comforting blanket I have ever owned',
    comment: 'The stitch tension and weight of this blanket are breathtaking. You can instantly feel the difference between mass-produced acrylic and pure artisanal Highland wool. It arrived in lovely brown kraft paper with dried lavender stems tucked under the string. Worth every single penny.',
    verifiedBuyer: true,
    helpfulCount: 24,
    tags: ['Heirloom Quality', 'Gift Packaging', 'Super Warm']
  },
  {
    id: 'rev-2',
    author: 'David & Julian L.',
    location: 'Denver, CO',
    rating: 5,
    date: '1 week ago',
    productName: 'Bramble the Woodland Fox',
    title: 'Our toddler refuses to sleep without Bramble',
    comment: 'Ordered this for our 2-year-old daughter’s birthday. The craftsmanship is flawless—no loose loops or uneven stuffing. Knowing it is 100% organic cotton gives such peace of mind. We also asked for custom initials on a little wooden tag, which was done with such care.',
    verifiedBuyer: true,
    helpfulCount: 19,
    tags: ['Child Safe', 'Soft Organic Cotton', 'Fast Shipping']
  },
  {
    id: 'rev-3',
    author: 'Camille R.',
    location: 'Burlington, VT',
    rating: 5,
    date: '2 weeks ago',
    productName: 'Botanical Bath & Glow Gift Hamper',
    title: 'Sent this to my sister for postpartum recovery',
    comment: 'My sister wept when she opened the box. The waffle washcloths are so thick and gently exfoliating, and the handwritten calligraphy note made it feel like a gift from a dear friend. This studio is truly keeping slow craft alive.',
    verifiedBuyer: true,
    helpfulCount: 31,
    tags: ['Mindful Gift', 'Handwritten Note', 'Zero Waste']
  },
  {
    id: 'rev-4',
    author: 'Sophie Chen',
    location: 'Seattle, WA',
    rating: 5,
    date: '3 weeks ago',
    productName: 'Meadowflora Botanical Market Tote',
    title: 'Gets compliments every weekend at the farmers market',
    comment: 'The granny squares are joined so sturdily! Most crochet bags stretch down to your knees after you put apples or a book inside, but the reinforced inner lining on this tote holds shape perfectly without distorting the floral design.',
    verifiedBuyer: true,
    helpfulCount: 15,
    tags: ['Everyday Durable', 'Vibrant Colors']
  },
  {
    id: 'rev-5',
    author: 'Marcus Vance',
    location: 'Austin, TX',
    rating: 4,
    date: '1 month ago',
    productName: 'Sunbeam Honeycomb Baby Blanket',
    title: 'Sublime texture, arrived slightly ahead of schedule',
    comment: 'The bamboo cotton blend is like butter to the touch. The scalloped picot edge is so dainty. Customer support was also wonderfully responsive when I reached out to verify shipping timelines before the baby shower.',
    verifiedBuyer: true,
    helpfulCount: 11,
    tags: ['Great Support', 'Baby Shower Hit']
  }
];
