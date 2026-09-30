import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CraftStorySection } from './components/CraftStorySection';
import { CommunityReviews } from './components/CommunityReviews';
import { InstagramFeed } from './components/InstagramFeed';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { Sparkles, CheckCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { notification, openCustomOrder } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#EADFD2] selection:text-[#523B2A]">
      
      {/* Global floating notification pill (placed bottom-left so n8n chat bubble sits freely at bottom-right) */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#2D2825] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#483B32] flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation Top Bar */}
      <Navbar
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onNavigateStory={() => {}}
        onNavigateReviews={() => {}}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        <CraftStorySection />

        <CommunityReviews />

        <InstagramFeed />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dynamic Overlays & Modals */}
      <ProductDetailModal />
      <CustomOrderModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
