"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchCollection, subscribeToCollection } from '../lib/adminDb';
import { MOCK_PRODUCTS } from '../constants';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All', 'Skin Care', 'Hair Care', 'Wellness', 'Therapeutics', 'Body Care', 'Oral Care & Wellness', 'Digestive Health', 'Immunity', 'Pain Relief']);
  const [products, setProducts] = useState<any[]>([]); // Initialize with empty array, MOCK_PRODUCTS is no longer used directly
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    let currentProducts: any[] = [];
    let currentCategories: any[] = [];

    const updateState = () => {
      const existingIds = new Set(currentProducts.map(prod => prod.id));
      const missingMockProducts = MOCK_PRODUCTS.filter(prod => !existingIds.has(String(prod.id)));
      
      const allProducts = [...currentProducts, ...missingMockProducts];
      setProducts(allProducts);
      
      const initialCategories = ['All', 'Skin Care', 'Hair Care', 'Wellness', 'Therapeutics', 'Body Care', 'Oral Care & Wellness', 'Digestive Health', 'Immunity', 'Pain Relief'];
      const fetchedCategoryNames = currentCategories.map((cat: any) => cat.name);
      const dynamicCategoryNames = allProducts.map(p => p.category).filter(Boolean);
      
      const uniqueCategories = new Set([...initialCategories, ...fetchedCategoryNames, ...dynamicCategoryNames]);
      setCategories(Array.from(uniqueCategories));
      setIsLoading(false);
    };

    const unsubProd = subscribeToCollection('products', (p) => {
      currentProducts = p
        .filter((prod: any) => !prod.deleted && prod.status !== 'Draft')
        .map((prod: any) => ({
          id: prod.id,
          name: prod.name,
          label: prod.category || 'Wellness',
          shortDesc: prod.description ? prod.description.replace(/<[^>]+>/g, '') : (prod.shortDesc || 'Traditional formulation.'),
          price: prod.basePrice || prod.price || 0,
          image: prod.images?.[0] || prod.image || 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
          category: prod.category || 'Wellness',
          status: prod.status || 'Published'
        }));
      updateState();
    });

    const unsubCat = subscribeToCollection('categories', (c) => {
      currentCategories = c;
      updateState();
    });

    return () => {
      unsubProd();
      unsubCat();
    };
  }, []);

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-black text-slate-900">Curated <span className="text-primary italic">Rituals</span></h2>
            <p className="text-slate-500 font-dm max-w-md">Explore our collection of traditional formulations, crafted with wisdom and pure botanicals.</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat: any) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 hover:text-primary border border-primary/5'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products
              .filter(p => activeCategory === 'All' || p.category === activeCategory || p.label === activeCategory)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
