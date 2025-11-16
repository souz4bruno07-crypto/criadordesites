
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product } from './types';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';

const App: React.FC = () => {
  // ATENÇÃO: Altere o número de WhatsApp abaixo para o número da sua loja.
  // Formato: código do país (55 para Brasil) + DDD + número. Ex: 5511987654321
  const WHATSAPP_PHONE_NUMBER = "555192355053";

  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setShowSplash(false), 1000); // Wait for fade out to complete
    }, 2500); // Splash screen duration

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data: Product[] = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let products = allProducts;

    if (selectedCategory) {
      products = products.filter(p => p.categoria === selectedCategory);
    }

    if (searchTerm) {
      products = products.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(products);
  }, [selectedCategory, searchTerm, allProducts]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.categoria))];
    // Custom sort order
    const order = ['brincos', 'pulseiras', 'colares', 'aneis', 'kits'];
    // FIX: Explicitly type sort parameters `a` and `b` as `string` because they were being inferred as `unknown`.
    return uniqueCategories.sort((a: string, b: string) => {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [allProducts]);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  if (showSplash) {
    return <SplashScreen isFadingOut={isFadingOut} />;
  }

  return (
    <div className="min-h-screen bg-pink-50" style={{ backgroundColor: '#fdf7f9' }}>
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <main className="flex-1 p-4 md:p-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={handleViewDetails} 
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
                <p className="text-2xl text-gray-500">Nenhum produto encontrado.</p>
                <p className="text-gray-400 mt-2">Tente ajustar seus filtros ou termo de busca.</p>
            </div>
          )}
        </main>
      </div>
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        whatsAppNumber={WHATSAPP_PHONE_NUMBER}
      />
    </div>
  );
};

export default App;