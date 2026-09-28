export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  tags?: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'blankets' | 'amigurumi' | 'wearables' | 'spa-gifts' | 'small-crochet' | 'cards-letters' | 'home-decor';
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  makerNotes: string;
  craftingTimeHours: number;
  dimensions: string;
  material: string;
  yarnWeight: string;
  careInstructions: string;
  inStock: boolean;
  stockCount: number;
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  giftWrap: boolean;
  giftNote?: string;
}

export interface CustomOrderRequest {
  id: string;
  itemType: string;
  yarnPreference: string;
  selectedPalette: string[];
  dimensions: string;
  personalizationText: string;
  neededByDate: string;
  specialInstructions: string;
  estimatedPrice: number;
  estimatedHours: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  status: 'Pending Artisan Review' | 'Pattern Drafted' | 'In Progress' | 'Finished & Wrapped';
}

export interface OrderReceipt {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  giftWrapFee: number;
  total: number;
  paymentMethod: string;
  cardLast4?: string;
  status: 'Confirmed' | 'Crafting / Assembling' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
