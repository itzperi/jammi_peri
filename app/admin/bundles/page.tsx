"use client";
import React, { useState, useEffect } from 'react';
import { fetchCollection, createDocument, updateDocument, deleteDocument } from '../../../lib/adminDb';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  discountPercentage: number;
  productIds: string[];
  isActive: boolean;
}

export default function AdminBundles() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const b = await fetchCollection('bundles') as Bundle[];
      setBundles(b);
      const p = await fetchCollection('products') as Product[];
      setProducts(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCreateBundle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductIds.length < 2) {
      alert("Please select at least 2 products for a bundle.");
      return;
    }
    try {
      const newBundle = { name, description, imageUrl, discountPercentage, productIds: selectedProductIds, isActive: true };
      const id = await createDocument('bundles', newBundle);
      setBundles([...bundles, { ...newBundle, id }]);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error creating bundle", err);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDocument('bundles', id, { isActive: !currentStatus });
      setBundles(bundles.map(b => b.id === id ? { ...b, isActive: !currentStatus } : b));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBundle = async (id: string) => {
    if (confirm("Delete this bundle?")) {
      try {
        await deleteDocument('bundles', id);
        setBundles(bundles.filter(b => b.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleProductSelection = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const resetForm = () => {
    setName(''); setDescription(''); setImageUrl(''); setDiscountPercentage(10); setSelectedProductIds([]);
  };

  const getBundlePrice = (bundle: Bundle) => {
    const totalOriginal = bundle.productIds.reduce((sum, pId) => {
      const p = products.find(prod => prod.id === pId);
      return sum + (p ? Number(p.price) : 0);
    }, 0);
    const discounted = totalOriginal - (totalOriginal * (bundle.discountPercentage / 100));
    return { original: totalOriginal, final: discounted };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bundle Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-forest text-white px-6 py-2.5 rounded-md font-bold hover:bg-forest/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Bundle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading bundles...</p>
          </div>
        ) : bundles.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200">
            <span className="material-symbols-outlined text-4xl mb-2">loyalty</span>
            <p>No product bundles created yet.</p>
          </div>
        ) : (
          bundles.map(bundle => {
            const prices = getBundlePrice(bundle);
            return (
              <div key={bundle.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="h-48 bg-slate-100 relative">
                  {bundle.imageUrl ? (
                    <img src={bundle.imageUrl} alt={bundle.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-4xl">image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => toggleStatus(bundle.id, bundle.isActive)} className={`px-2 py-1 text-[10px] uppercase font-bold rounded shadow-sm ${bundle.isActive ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-500 text-white hover:bg-slate-600'}`}>
                      {bundle.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 bg-saffron text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                    {bundle.discountPercentage}% OFF
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{bundle.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{bundle.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 text-sm">
                    <p className="font-bold text-slate-700 mb-2">Included Products ({bundle.productIds.length}):</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                      {bundle.productIds.slice(0, 3).map(id => {
                        const p = products.find(prod => prod.id === id);
                        return <li key={id}>{p ? p.name : 'Unknown Product'}</li>;
                      })}
                      {bundle.productIds.length > 3 && <li className="text-slate-400 italic">+{bundle.productIds.length - 3} more...</li>}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400 line-through">₹{prices.original.toLocaleString()}</p>
                      <p className="text-xl font-bold text-forest">₹{prices.final.toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteBundle(bundle.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Delete Bundle">
                      <span className="material-symbols-outlined text-[22px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => {setIsModalOpen(false); resetForm();}} />
          <div className="relative z-10 w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-saffron">loyalty</span>
              Create Product Bundle
            </h2>
            <form onSubmit={handleCreateBundle} className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Bundle Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest" /></div>
              
              <div><label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} required className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest resize-none" /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Image URL</label>
                <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Discount Percentage (%)</label>
                <input type="number" value={discountPercentage} onChange={e => setDiscountPercentage(Number(e.target.value))} min="1" max="99" required className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest" /></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Select Products to Include</label>
                <div className="bg-slate-50 border border-slate-200 rounded p-4 max-h-48 overflow-y-auto space-y-2">
                  {products.length === 0 ? <p className="text-sm text-slate-500">No products available. Add products first.</p> : (
                    products.map(p => (
                      <label key={p.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={selectedProductIds.includes(p.id)}
                          onChange={() => toggleProductSelection(p.id)}
                          className="w-4 h-4 text-forest focus:ring-forest rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-800">{p.name}</span>
                        <span className="text-xs text-slate-500 ml-auto flex-shrink-0">₹{Number(p.price).toLocaleString()}</span>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">Select at least 2 products.</p>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => {setIsModalOpen(false); resetForm();}} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded transition-colors">Cancel</button>
                <button type="submit" className="bg-forest text-white px-6 py-2.5 rounded font-bold hover:bg-forest/90 transition-colors">Create Bundle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
