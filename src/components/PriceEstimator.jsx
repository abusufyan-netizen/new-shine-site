import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Sparkles, Home, Zap, Info } from 'lucide-react';
import OrderModal from './OrderModal'; // Ensure path is correct

const CATEGORIES = [
  { 
    id: 'daily', 
    name: 'Daily Wear', 
    icon: <Shirt size={20} />, 
    items: [
      { id: 'd1', name: 'Shirt / Kurta', reg: 150, urg: 250 },
      { id: 'd2', name: 'Shalwar Kameez', reg: 350, urg: 500 },
      { id: 'd3', name: 'Trouser / Jeans', reg: 180, urg: 300 },
    ]
  },
  { 
    id: 'fancy', 
    name: 'Fancy / Wedding', 
    icon: <Sparkles size={20} />, 
    items: [
      { id: 'f1', name: 'Waistcoat', reg: 400, urg: 600 },
      { id: 'f2', name: 'Sherwani', reg: 1200, urg: 1800 },
      { id: 'f3', name: 'Bridal Lehenga', reg: 2500, urg: 3500 },
    ]
  },
  { 
    id: 'home', 
    name: 'Home & Bedding', 
    icon: <Home size={20} />, 
    items: [
      { id: 'h1', name: 'Blanket (Single)', reg: 800, urg: 1200 },
      { id: 'h2', name: 'Curtain (Per Panel)', reg: 500, urg: 800 },
      { id: 'h3', name: 'Bedsheet', reg: 450, urg: 700 },
    ]
  }
];

export default function PriceEstimator() {
  const [activeTab, setActiveTab] = useState('daily');
  const [cart, setCart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateCart = (id, qtyChange, priceType, name, price) => {
    setCart(prev => {
      const cartKey = `${id}_${priceType}`;
      const current = prev[cartKey] || { qty: 0, type: priceType, name, price };
      const newQty = Math.max(0, current.qty + qtyChange);
      
      if (newQty === 0) {
        const { [cartKey]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [cartKey]: { ...current, qty: newQty } };
    });
  };

  const totalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.qty * item.price), 0);

  return (
    <section id="estimator" className="py-24 px-6 bg-surface relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Price <span className="text-primary italic">Estimator</span></h2>
          <p className="text-text-muted">Select items from categories below for an instant quote.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 p-2 bg-surface-soft rounded-2xl border border-border mb-10 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === cat.id ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-text'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* List of Clothes */}
        <div className="space-y-4 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-4"
            >
              {CATEGORIES.find(c => c.id === activeTab).items.map(item => (
                <div key={item.id} className="bg-card border border-border p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-text">{item.name}</h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] font-black text-text-muted uppercase">Regular: Rs. {item.reg}</span>
                      <span className="text-[10px] font-black text-primary uppercase">Urgent: Rs. {item.urg}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Regular Control */}
                    <div className="text-center">
                      <p className="text-[10px] font-bold mb-1 opacity-60 uppercase">Regular</p>
                      <div className="flex items-center bg-surface-soft rounded-full p-1 border border-border">
                        <button onClick={() => updateCart(item.id, -1, 'reg', item.name, item.reg)} className="w-8 h-8 rounded-full hover:bg-border transition-colors">-</button>
                        <span className="w-8 text-center font-bold text-sm">{cart[`${item.id}_reg`]?.qty || 0}</span>
                        <button onClick={() => updateCart(item.id, 1, 'reg', item.name, item.reg)} className="w-8 h-8 rounded-full bg-surface shadow-sm">+</button>
                      </div>
                    </div>

                    {/* Urgent Control */}
                    <div className="text-center">
                      <p className="text-[10px] font-bold mb-1 text-primary uppercase">Urgent</p>
                      <div className="flex items-center bg-primary/5 rounded-full p-1 border border-primary/20">
                        <button onClick={() => updateCart(item.id, -1, 'urg', item.name, item.urg)} className="w-8 h-8 rounded-full text-primary hover:bg-primary/10">-</button>
                        <span className="w-8 text-center font-bold text-sm text-primary">{cart[`${item.id}_urg`]?.qty || 0}</span>
                        <button onClick={() => updateCart(item.id, 1, 'urg', item.name, item.urg)} className="w-8 h-8 rounded-full bg-primary text-white shadow-md">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Checkout Bar */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-text text-surface p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10 pointer-events-auto">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Total Items</p>
                  <p className="text-2xl font-black">{totalQty}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Est. Bill</p>
                  <p className="text-2xl font-black text-primary">Rs. {totalPrice}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-2 shadow-xl shadow-primary/20"
              >
                Order Pickup <Zap size={18} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Order Modal Component */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cartTotal={totalPrice} 
        totalQty={totalQty} 
      />
    </section>
  );
}