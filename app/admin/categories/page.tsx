"use client";
import React, { useState, useEffect } from 'react';
import { subscribeToCollection, deleteDocument, createDocument } from '../../../lib/adminDb';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string | null;
  description?: string;
  productCount?: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  useEffect(() => {
    const unsub = subscribeToCollection('categories', (data) => {
      setCategories(data as Category[]);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
      try {
        await deleteDocument('categories', id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
        console.error("Error deleting category", err);
      }
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    try {
      const newCat = {
        name: newCatName,
        slug: newCatSlug,
        parentCategory: newCatParent || null,
        description: newCatDesc,
        productCount: 0
      };
      const id = await createDocument('categories', newCat);
      setCategories([...categories, { ...newCat, id }]);
      setIsModalOpen(false);
      setNewCatName('');
      setNewCatSlug('');
      setNewCatParent('');
      setNewCatDesc('');
    } catch (err) {
      console.error("Error creating category", err);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewCatName(val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!newCatSlug || newCatSlug === newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setNewCatSlug(generatedSlug);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Category Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-forest text-white px-6 py-2.5 rounded-md font-bold hover:bg-forest/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold">Category Name</th>
                <th className="p-4 font-bold">Slug</th>
                <th className="p-4 font-bold">Parent Category</th>
                <th className="p-4 font-bold">Products</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
                      <p>Loading categories...</p>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                     <span className="material-symbols-outlined text-4xl">category</span>
                     <p>No categories found.</p>
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{cat.name}</td>
                    <td className="p-4 font-mono text-xs text-slate-500">{cat.slug}</td>
                    <td className="p-4">{cat.parentCategory || <span className="text-slate-400 italic">None</span>}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md">
                        {cat.productCount || 0}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                       <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors" title="Edit">
                         <span className="material-symbols-outlined text-[18px]">edit</span>
                       </button>
                       <button onClick={() => handleDelete(cat.id, cat.name)} className="text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors" title="Delete">
                         <span className="material-symbols-outlined text-[18px]">delete</span>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Category</h2>
            <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={handleNameChange}
                  className="w-full border border-slate-300 rounded px-4 py-2.5 focus:outline-none focus:border-forest"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Slug</label>
                <input 
                  type="text" 
                  value={newCatSlug}
                  onChange={e => setNewCatSlug(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-2.5 focus:outline-none focus:border-forest font-mono text-sm bg-slate-50 text-slate-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Parent Category</label>
                <select 
                  value={newCatParent}
                  onChange={e => setNewCatParent(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-2.5 focus:outline-none focus:border-forest bg-white"
                >
                  <option value="">None (Top Level)</option>
                  {categories.filter(c => c.parentCategory == null || c.parentCategory === '').map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                <textarea 
                  value={newCatDesc}
                  onChange={e => setNewCatDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-300 rounded px-4 py-2.5 focus:outline-none focus:border-forest resize-none"
                  placeholder="Optional category description..."
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-forest text-white px-6 py-2.5 rounded font-bold hover:bg-forest/90 transition-colors">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
