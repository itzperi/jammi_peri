"use client";

import React, { useState, useEffect } from 'react';
import { useFederationStore } from '../store/federationStore';

const Checkout: React.FC = () => {
  const { products } = useFederationStore();
  
  // Initialize with a real product if available
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (products.length > 0 && !initialized) {
      setCartItems([products[0]]);
      setInitialized(true);
    }
  }, [products, initialized]);

  const [isPlacing, setIsPlacing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Promotions states
  const [coupons, setCoupons] = useState<any[]>([]);
  const [bundles, setBundles] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponError, setCouponError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    email: ''
  });

  // Fetch active promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const { fetchCollection } = await import('../lib/adminDb');
        
        const couponsData = await fetchCollection('coupons');
        setCoupons(couponsData.filter((c: any) => c.isActive));
        
        const bundlesData = await fetchCollection('bundles');
        setBundles(bundlesData.filter((b: any) => b.isActive));
      } catch (err) {
        console.error("Failed to fetch promotions", err);
      }
    };
    fetchPromotions();
  }, []);

  // --- Evaluate Bundles ---
  const cartItemIds = cartItems.map(item => item.id);
  
  let totalBundleDiscount = 0;
  const appliedBundles: any[] = [];
  const suggestedBundleProducts: any[] = [];
  
  const sortedBundles = [...bundles].sort((a,b) => b.discountPercentage - a.discountPercentage);
  const usedProductIds = new Set<string>();
  
  sortedBundles.forEach(bundle => {
    const bundleProductIds = bundle.productIds || [];
    if (bundleProductIds.length === 0) return;

    // Check overlaps
    const isFullyMatched = bundleProductIds.every((id: string) => cartItemIds.includes(id));
    const isPartiallyMatched = !isFullyMatched && bundleProductIds.some((id: string) => cartItemIds.includes(id));
    
    if (isFullyMatched) {
      const hasOverlap = bundleProductIds.some((id: string) => usedProductIds.has(id));
      if (!hasOverlap) {
        appliedBundles.push(bundle);
        bundleProductIds.forEach((id: string) => usedProductIds.add(id));
        
        let bundlePriceSum = 0;
        bundleProductIds.forEach((id: string) => {
          const item = cartItems.find(cItem => cItem.id === id);
          if (item) bundlePriceSum += item.price;
        });
        
        totalBundleDiscount += (bundlePriceSum * bundle.discountPercentage) / 100;
      }
    } else if (isPartiallyMatched) {
      // Suggest missing products
      const missingIds = bundleProductIds.filter((id: string) => !cartItemIds.includes(id));
      missingIds.forEach((id: string) => {
        const prod = products.find(p => p.id === id);
        if (prod && !suggestedBundleProducts.find(s => s.id === id)) {
          suggestedBundleProducts.push({
            ...prod,
            suggestedByBundle: bundle.name,
            discountPercentage: bundle.discountPercentage
          });
        }
      });
    }
  });

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      couponDiscountAmount = appliedCoupon.discountValue;
    }
  }
  
  totalBundleDiscount = Math.round(totalBundleDiscount);
  const totalDiscount = Math.round(couponDiscountAmount + totalBundleDiscount);
  const total = Math.max(0, subtotal - totalDiscount);

  const handleAddBundleProduct = (product: any) => {
    // Determine the product price taking bundle discounts as potentially applied later
    setCartItems([...cartItems, product]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    
    // Auto-remove coupon if minimum requirement failure
    if (appliedCoupon) {
      const newSubtotal = newItems.reduce((acc, item) => acc + (item.price || 0), 0);
      if (newSubtotal < appliedCoupon.minOrderAmount) {
        setAppliedCoupon(null);
        setCouponError('Coupon removed: Order sum fell below minimum required.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setAppliedCoupon(null);
    
    if (!couponCode.trim()) return;

    const foundCoupon = coupons.find(c => c.code === couponCode.trim().toUpperCase());
    
    if (!foundCoupon) {
      setCouponError('Invalid coupon code.');
      return;
    }
    
    if (subtotal < foundCoupon.minOrderAmount) {
      setCouponError(`Minimum order amount of ₹${foundCoupon.minOrderAmount} required.`);
      return;
    }

    setAppliedCoupon(foundCoupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handlePlaceOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.address) {
      alert("Please fill in required fields (Name, Email, Address)");
      return;
    }

    setIsPlacing(true);
    try {
      const { createDocument, getNextOrderNumber } = await import('../lib/adminDb');
      
      const nextId = await getNextOrderNumber();
      
      const orderData = {
        orderNumber: nextId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        total: total,
        status: 'Pending',
        paymentStatus: 'Pending',
        subtotal: subtotal,
        totalDiscount: totalDiscount,
        couponApplied: appliedCoupon ? {
          code: appliedCoupon.code,
          discountAmount: couponDiscountAmount
        } : null,
        bundlesApplied: appliedBundles.map(b => ({
          name: b.name,
          discountPercentage: b.discountPercentage
        })),
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image || ''
        })),
        createdAt: new Date().toISOString()
      };

      await createDocument('orders', orderData);

      const customerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        lastOrderDate: new Date().toISOString(),
        status: 'Active'
      };
      
      await createDocument('customers', customerData);

      setOrderNumber(nextId);
      setOrderConfirmed(true);
      
      // Redirect to Razorpay payment gateway
      window.location.href = "https://rzp.io/rzp/ZJ3foBWO";
      
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-24 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h2 className="text-3xl font-bold serif mb-4 text-forest">Order Confirmed!</h2>
        <p className="text-lg text-slate-600 mb-8">
          Thank you for your order. Your order ID is <span className="font-bold text-primary">{orderNumber}</span>.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-primary hover:bg-[#c07a28] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 mt-10">
      <div className="flex flex-wrap gap-2 py-2 mb-8 text-primary text-sm font-medium">
        <span>Cart</span>
        <span className="text-cream-dark">/</span>
        <span className="text-forest">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-forest">
              <span className="material-symbols-outlined text-primary">home_pin</span>
              <h2 className="text-2xl font-bold serif">Delivery Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="First Name *" />
              </div>
              <div className="space-y-1">
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Last Name" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Email Address *" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Phone Number" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <input name="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Address line 1 *" />
              </div>
              <div className="space-y-1">
                <input name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Town / City" />
              </div>
              <div className="space-y-1">
                <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Pincode" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
            <div className="flex items-center justify-between mb-6 text-forest">
              <div className="flex items-center gap-2 font-bold serif text-2xl">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                Payment Method
              </div>
            </div>
            <div className="space-y-4">
              {['UPI (GPay, PhonePe)', 'Credit / Debit Cards', 'Cash on Delivery'].map((method, idx) => (
                <label key={method} className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${idx === 0 ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200 hover:border-primary/50'}`}>
                  <div className="flex items-center gap-4">
                    <input defaultChecked={idx === 0} name="payment" type="radio" className="w-5 h-5 text-primary focus:ring-primary border-slate-300" />
                    <p className="font-bold text-slate-800">{method}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
              <h3 className="text-xl font-bold serif mb-6 border-b border-cream-dark pb-4 text-forest">Order Summary</h3>

              <div className="space-y-5 mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-center text-slate-500 py-4">Your cart is empty.</p>
                ) : (
                  cartItems.map((item, idx) => {
                    const isPartInBundle = usedProductIds.has(item.id);
                    return (
                      <div key={idx} className="flex gap-4 relative group">
                        <div className="size-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                          ) : (
                            <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                          )}
                        </div>
                        <div className="flex-1 py-1">
                          <p className="text-sm font-bold leading-tight text-slate-800 line-clamp-2 pr-6">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-1">Qty: 1</p>
                          <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-sm font-bold text-primary">₹{item.price}</p>
                            {isPartInBundle && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Bundle Applied</span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(idx)}
                          className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-3 pt-5 border-t border-cream-dark">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                
                {appliedBundles.length > 0 && (
                  <div className="flex justify-between text-green-600 font-bold text-sm">
                    <span>Bundle Discount</span>
                    <span>-₹{totalBundleDiscount}</span>
                  </div>
                )}
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 font-bold text-sm">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-slate-100 mt-3 text-forest">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 pt-6 border-t border-cream-dark">
                <h4 className="text-sm font-bold serif mb-3 text-forest">Apply Promo Code</h4>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      <span className="font-bold text-sm">{appliedCoupon.code} Applied</span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-xs text-red-600 hover:text-red-800 font-bold uppercase hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 rounded-xl border border-cream-dark h-12 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase transition-all"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-5 rounded-xl text-sm font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600 font-medium animate-in fade-in flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        {couponError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isPlacing || cartItems.length === 0}
                className="w-full bg-primary hover:bg-[#c07a28] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl mt-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined">lock</span>
                )}
                {isPlacing ? 'Placing Order...' : 'Place Order Securely'}
              </button>
            </div>

            {/* Bundle Suggestions Widget */}
            {suggestedBundleProducts.length > 0 && (
              <div className="bg-gradient-to-br from-[#FFFDF8] to-[#FDF4E7] p-6 rounded-2xl border border-primary/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                  <h3 className="text-lg font-bold serif text-forest">Complete the Bundle</h3>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-snug">
                  Add these items to unlock your <span className="font-bold text-primary">{suggestedBundleProducts[0].discountPercentage}%</span> combo discount instantly!
                </p>

                <div className="space-y-4">
                  {suggestedBundleProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/10 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] transition-all hover:border-primary/40 hover:shadow-md group">
                      <div className="size-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                        ) : (
                          <span className="material-symbols-outlined text-slate-300">image</span>
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <p className="text-sm font-bold text-slate-800 line-clamp-2 pr-2">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-sm font-bold text-primary">₹{product.price}</span>
                          <span className="text-[10px] text-primary/70 bg-primary/10 px-1.5 rounded font-bold">Recommended</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddBundleProduct(product)}
                        className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center flex-shrink-0 mr-1"
                        title="Add to order"
                      >
                        <span className="material-symbols-outlined font-bold">add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
