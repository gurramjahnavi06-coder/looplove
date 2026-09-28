import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review, CustomOrderRequest, OrderReceipt } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_REVIEWS } from '../data/reviews';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  reviews: Review[];
  customOrders: CustomOrderRequest[];
  orderHistory: OrderReceipt[];
  activeProductModal: Product | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isCustomOrderOpen: boolean;
  isReviewModalOpen: boolean;
  activeReceipt: OrderReceipt | null;
  notification: string | null;
  discountRate: number;
  promoCodeApplied: string | null;
  
  // Actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, giftWrap?: boolean, giftNote?: string) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQty: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openCustomOrder: () => void;
  closeCustomOrder: () => void;
  openReviewModal: () => void;
  closeReviewModal: () => void;
  closeReceiptModal: () => void;
  
  applyPromoCode: (code: string) => { success: boolean; message: string };
  submitCustomOrder: (request: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>) => string;
  submitReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  markReviewHelpful: (reviewId: string) => void;
  completeCheckout: (details: {
    customerName: string;
    customerEmail: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
    cardLast4?: string;
  }) => OrderReceipt;
  
  cartSubtotal: number;
  cartTotalCount: number;
  freeShippingThreshold: number;
  shippingFee: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Persistent Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hearth_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hearth_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('hearth_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Persistent Custom Orders
  const [customOrders, setCustomOrders] = useState<CustomOrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem('hearth_custom_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Order History
  const [orderHistory, setOrderHistory] = useState<OrderReceipt[]>(() => {
    try {
      const saved = localStorage.getItem('hearth_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<OrderReceipt | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Pricing & Discounts
  const [discountRate, setDiscountRate] = useState(0);
  const [promoCodeApplied, setPromoCodeApplied] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('hearth_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('hearth_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('hearth_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('hearth_custom_orders', JSON.stringify(customOrders));
    } catch {
      // ignore
    }
  }, [customOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('hearth_orders', JSON.stringify(orderHistory));
    } catch {
      // ignore
    }
  }, [orderHistory]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor = product.colors[0]?.name || 'Natural',
    giftWrap = false,
    giftNote = ''
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        if (giftWrap) copy[existingIdx].giftWrap = true;
        if (giftNote) copy[existingIdx].giftNote = giftNote;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor,
          giftWrap,
          giftNote
        }
      ];
    });
    showNotification(`Added ${product.name} to your basket`);
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prev) => prev.filter(
      (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
    ));
    showNotification('Item removed from basket');
  };

  const updateQuantity = (productId: string, selectedColor: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showNotification('Saved item removed');
        return prev.filter((id) => id !== productId);
      }
      showNotification('Saved to your favorites');
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openProductDetail = (product: Product) => setActiveProductModal(product);
  const closeProductDetail = () => setActiveProductModal(null);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openCustomOrder = () => setIsCustomOrderOpen(true);
  const closeCustomOrder = () => setIsCustomOrderOpen(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);
  const closeReceiptModal = () => setActiveReceipt(null);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'COZY10') {
      setDiscountRate(0.10);
      setPromoCodeApplied('COZY10 (10% off)');
      return { success: true, message: '10% discount applied to your order!' };
    }
    if (clean === 'FIRSTSTITCH') {
      setDiscountRate(0.15);
      setPromoCodeApplied('FIRSTSTITCH (15% off)');
      return { success: true, message: '15% welcome discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "COZY10"' };
  };

  const submitCustomOrder = (request: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>) => {
    const newId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomOrderRequest = {
      ...request,
      id: newId,
      createdAt: 'Just now',
      status: 'Pending Artisan Review'
    };
    setCustomOrders((prev) => [newOrder, ...prev]);
    showNotification(`Custom request ${newId} submitted! We'll reply within 24 hours.`);
    return newId;
  };

  const submitReview = (newRev: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Today',
      helpfulCount: 1
    };
    setReviews((prev) => [rev, ...prev]);
    showNotification('Thank you! Your verified review has been published.');
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 85;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 7;

  const completeCheckout = (details: {
    customerName: string;
    customerEmail: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
    cardLast4?: string;
  }): OrderReceipt => {
    const orderId = `LL-${Math.floor(10000 + Math.random() * 90000)}`;
    const giftWrapFee = cart.some((i) => i.giftWrap) ? 5 : 0;
    const discount = cartSubtotal * discountRate;
    const finalTotal = Math.max(0, cartSubtotal - discount + shippingFee + giftWrapFee);

    const receipt: OrderReceipt = {
      orderId,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      shippingAddress: details.shippingAddress,
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      discount,
      giftWrapFee,
      total: finalTotal,
      paymentMethod: details.paymentMethod,
      cardLast4: details.cardLast4 || '4242',
      status: 'Confirmed',
      estimatedDelivery: '3 - 5 business days'
    };

    setOrderHistory((prev) => [receipt, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setActiveReceipt(receipt);
    return receipt;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        reviews,
        customOrders,
        orderHistory,
        activeProductModal,
        isCartOpen,
        isCheckoutOpen,
        isCustomOrderOpen,
        isReviewModalOpen,
        activeReceipt,
        notification,
        discountRate,
        promoCodeApplied,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        openProductDetail,
        closeProductDetail,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        openCustomOrder,
        closeCustomOrder,
        openReviewModal,
        closeReviewModal,
        closeReceiptModal,
        applyPromoCode,
        submitCustomOrder,
        submitReview,
        markReviewHelpful,
        completeCheckout,
        cartSubtotal,
        cartTotalCount,
        freeShippingThreshold,
        shippingFee
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
