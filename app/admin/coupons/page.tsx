"use client";
import React, { useState, useEffect } from 'react';
import { subscribeToCollection, createDocument, updateDocument, deleteDocument } from '../../../lib/adminDb';

interface Coupon {
  id: string;
  code: string;
  type: 'Percentage' | 'Fixed';
  value: number;
  minSpend: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'Percentage' | 'Fixed'>('Percentage');
  const [value, setValue] = useState(0);
  const [minSpend, setMinSpend] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usageLimit, setUsageLimit] = useState(100);

  useEffect(() => {
    setIsLoading(true);
    const unsub = subscribeToCollection('coupons', (data) => {
      const c = data as Coupon[];
      setCoupons(c.sort((a, b) => new Date(b.endDate || 0).getTime() - new Date(a.endDate || 0).getTime()));
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value || !startDate || !endDate) return;

    try {
      const newCoupon = {
        code: code.toUpperCase(),
        type,
        value,
        minSpend,
        startDate,
        endDate,
        usageLimit,
        timesUsed: 0,
        isActive: true
      };
      
      const id = await createDocument('coupons', newCoupon);
      setCoupons([{ ...newCoupon, id }, ...coupons]);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error creating coupon", err);
      alert("Failed to create coupon.");
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDocument('coupons', id, { isActive: !currentStatus });
      setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
    } catch (err) {
      console.error("Error toggling status", err);
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (confirm(`Delete coupon ${code}?`)) {
      try {
        await deleteDocument('coupons', id);
        setCoupons(coupons.filter(c => c.id !== id));
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const resetForm = () => {
    setCode('');
    setType('Percentage');
    setValue(0);
    setMinSpend(0);
    setStartDate('');
    setEndDate('');
    setUsageLimit(100);
  };

  const getStatusBadge = (coupon: Coupon) => {
    const isExpired = new Date(coupon.endDate) < new Date();
    const isExhausted = coupon.timesUsed >= coupon.usageLimit;
    
    if (!coupon.isActive) return <span className="px-2 py-1 text-[10px] uppercase font-bold rounded bg-slate-100 text-slate-600">Inactive</span>;
    if (isExpired) return <span className="px-2 py-1 text-[10px] uppercase font-bold rounded bg-red-100 text-red-700">Expired</span>;
    if (isExhausted) return <span className="px-2 py-1 text-[10px] uppercase font-bold rounded bg-yellow-100 text-yellow-800">Limit Reached</span>;
    
    return <span className="px-2 py-1 text-[10px] uppercase font-bold rounded bg-green-100 text-green-700">Active</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Discount & Coupons</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-forest text-white px-6 py-2.5 rounded-md font-bold hover:bg-forest/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold">Code</th>
                <th className="p-4 font-bold">Discount</th>
                <th className="p-4 font-bold">Min Spend</th>
                <th className="p-4 font-bold">Validity</th>
                <th className="p-4 font-bold text-center">Usage</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
                      <p>Loading coupons...</p>
                    </div>
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                     <span className="material-symbols-outlined text-4xl">local_offer</span>
                     <p>No coupons found.</p>
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {coupon.type === 'Percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                    </td>
                    <td className="p-4 text-slate-500">
                      {coupon.minSpend > 0 ? `₹${coupon.minSpend}` : 'None'}
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-400">Start:</span> {new Date(coupon.startDate).toLocaleDateString()}</div>
                      <div><span className="font-medium text-slate-400">End:</span> {new Date(coupon.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {coupon.timesUsed} / {coupon.usageLimit}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(coupon)}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                       <button 
                         onClick={() => toggleStatus(coupon.id, coupon.isActive)} 
                         className={`px-3 py-1.5 rounded text-xs font-bold transition-colors border ${coupon.isActive ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                       >
                         {coupon.isActive ? 'Deactivate' : 'Activate'}
                       </button>
                       <button onClick={() => handleDelete(coupon.id, coupon.code)} className="text-red-600 hover:text-red-800 border border-red-200 hover:bg-red-50 px-2 py-1.5 rounded transition-colors" title="Delete">
                         <span className="material-symbols-outlined text-[16px]">delete</span>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => {setIsModalOpen(false); resetForm();}} />
          <div className="relative z-10 w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-saffron">local_offer</span>
              Create New Coupon
            </h2>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Coupon Code</label>
                <input 
                  type="text" 
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER20"
                  className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest font-mono uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Discount Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as 'Percentage' | 'Fixed')}
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest bg-white"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Discount Value</label>
                  <input 
                    type="number" 
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                    min="1"
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Min Spend (₹)</label>
                  <input 
                    type="number" 
                    value={minSpend}
                    onChange={e => setMinSpend(Number(e.target.value))}
                    min="0"
                    placeholder="0 for no limit"
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Usage Limit</label>
                  <input 
                    type="number" 
                    value={usageLimit}
                    onChange={e => setUsageLimit(Number(e.target.value))}
                    min="1"
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => {setIsModalOpen(false); resetForm();}} className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-forest text-white px-6 py-2.5 rounded font-bold hover:bg-forest/90 transition-colors">
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
