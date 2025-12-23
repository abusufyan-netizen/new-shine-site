import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Save, RefreshCw, Trash2, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PriceManager = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('name');
    setPrices(data || []);
    setLoading(false);
  };

  const handleUpdate = async (id, newPrice) => {
    setSavingId(id);
    const { error } = await supabase
      .from('services')
      .update({ price: parseInt(newPrice) })
      .eq('id', id);
    
    if (!error) {
      setPrices(prices.map(p => p.id === id ? { ...p, price: parseInt(newPrice) } : p));
      setTimeout(() => setSavingId(null), 1000); // Visual feedback
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Delete this item from the public price list?")) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) setPrices(prices.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8 bg-card rounded-[2.5rem] border border-border shadow-2xl transition-all">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tighter">Live Price Manager</h2>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Babu Mehar Town Branch</p>
        </div>
        <button 
          onClick={fetchPrices}
          className="p-3 bg-surface-soft border border-border rounded-2xl text-text-muted hover:text-primary transition-all"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {prices.map((p) => (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={p.id} 
              className="group flex items-center gap-4 p-5 bg-surface-soft/50 rounded-2xl border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex-1">
                <span className="font-bold text-text block">{p.item || p.name}</span>
                <span className="text-[10px] text-text-muted font-black uppercase">Service ID: {p.id}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative flex items-center gap-2">
                  <span className="text-text-muted font-bold text-sm">Rs.</span>
                  <input 
                    type="number" 
                    defaultValue={p.price} 
                    onBlur={(e) => handleUpdate(p.id, e.target.value)}
                    className="w-28 p-3 bg-surface border border-border rounded-xl text-text font-black text-center focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  {savingId === p.id && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -right-8 text-green-500"
                    >
                      <CheckCircle size={18} />
                    </motion.div>
                  )}
                </div>
                
                <button 
                  onClick={() => deleteItem(p.id)}
                  className="p-2 text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="w-full mt-8 p-5 border-2 border-dashed border-border rounded-2xl text-text-muted font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
        <Plus size={20} /> Add New Catalog Item
      </button>
    </div>
  );
};

export default PriceManager;