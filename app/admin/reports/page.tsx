"use client";
import React, { useState, useEffect } from 'react';
import { fetchCollection } from '../../../lib/adminDb';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: { id: string; name: string; quantity: number; price: number }[];
}

interface ProductSales {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
}

export default function AdminReports() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [dateRange, setDateRange] = useState<'7days' | '30days' | 'year' | 'all'>('30days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const o = await fetchCollection('orders') as Order[];
      setOrders(o);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getFilteredOrders = () => {
    const now = new Date();
    let cutoff = new Date(0); // all time by default

    if (dateRange === '7days') cutoff = new Date(now.setDate(now.getDate() - 7));
    if (dateRange === '30days') cutoff = new Date(now.setDate(now.getDate() - 30));
    if (dateRange === 'year') cutoff = new Date(now.setFullYear(now.getFullYear() - 1));

    return orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      if (startDate && endDate) {
         return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      }
      return orderDate >= cutoff;
    });
  };

  const filteredOrders = getFilteredOrders();
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrdersCount = filteredOrders.length;
  const completedOrders = filteredOrders.filter(o => o.status === 'Delivered').length;

  const getTopProducts = (): ProductSales[] => {
    const productMap: Record<string, ProductSales> = {};
    filteredOrders.forEach(order => {
      order.items?.forEach(item => {
         if (!productMap[item.id]) {
            productMap[item.id] = { id: item.id, name: item.name, unitsSold: 0, revenue: 0 };
         }
         productMap[item.id].unitsSold += Number(item.quantity);
         productMap[item.id].revenue += Number(item.quantity) * Number(item.price);
      });
    });
    return Object.values(productMap).sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5);
  };

  const topProducts = getTopProducts();

  const exportCSV = () => {
    const headers = ['Report Range', 'Total Orders', 'Completed Orders', 'Total Revenue'];
    const rows = [
      [dateRange, totalOrdersCount, completedOrders, totalRevenue]
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    csvContent += "\n\nTop Selling Products\n";
    csvContent += "Product Name,Units Sold,Revenue\n";
    topProducts.forEach(p => {
       csvContent += `"${p.name}",${p.unitsSold},${p.revenue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Reports & Analytics</h1>
        <button 
          onClick={exportCSV}
          className="bg-forest text-white px-4 py-2 rounded-md font-bold hover:bg-forest/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['7days', '30days', 'year', 'all'].map(range => (
            <button
              key={range}
              onClick={() => { setDateRange(range as any); setStartDate(''); setEndDate(''); }}
              className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${dateRange === range && !startDate ? 'bg-forest text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {range === '7days' ? 'Last 7 Days' : range === '30days' ? 'Last 30 Days' : range === 'year' ? 'Last Year' : 'All Time'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Custom Range:</span>
          <input type="date" value={startDate} onChange={e => {setStartDate(e.target.value); setDateRange('all');}} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-forest" />
          <span className="text-slate-400">-</span>
          <input type="date" value={endDate} onChange={e => {setEndDate(e.target.value); setDateRange('all');}} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-forest" />
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
            <p>Generating reports...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue</span>
              <p className="text-3xl font-bold text-saffron">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
              <p className="text-3xl font-bold text-slate-800">{totalOrdersCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Orders</span>
              <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">Top Selling Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold">Product Name</th>
                    <th className="p-4 font-bold text-center">Units Sold</th>
                    <th className="p-4 font-bold text-right">Revenue Generated</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {topProducts.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500">No sales data found for this period.</td>
                    </tr>
                  ) : (
                    topProducts.map((product, idx) => (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500 font-bold text-xs">{idx + 1}</span>
                          {product.name}
                        </td>
                        <td className="p-4 text-center font-medium bg-green-50/50">{product.unitsSold}</td>
                        <td className="p-4 text-right font-bold text-saffron">₹{product.revenue.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
