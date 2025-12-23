import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { X, MapPin, Phone, User, CheckCircle, Loader2, ReceiptText, ChevronRight } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, cartTotal, totalQty, cart }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Babu Mehar Town, Lahore',
  });

  const cartItems = Object.values(cart || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('orders').insert([{
      customer_name: formData.name,
      phone: formData.phone,
      address: formData.address,
      item_count: totalQty,
      total_price: cartTotal,
      order_details: cartItems, // Storing the detailed breakdown
      status: 'Received'
    }]);

    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 4000);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-text/60 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-[3rem] shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {success ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter">SUCCESS!</h2>
                <p className="text-text-muted font-bold">Your clothes are in good hands.</p>
                <div className="mt-8 p-4 bg-surface-soft rounded-2xl border border-border inline-block">
                  <p className="text-xs font-black uppercase text-primary">Next Step</p>
                  <p className="text-sm">Rider will arrive within 45 mins</p>
                </div>
              </motion.div>
            ) : (
              <>
                <button onClick={onClose} className="absolute top-8 right-8 text-text-muted hover:text-text transition-colors"><X /></button>
                <h2 className="text-3xl font-black mb-8 tracking-tight">Order <span className="text-primary">Summary</span></h2>
                
                {/* 1. Item Breakdown List */}
                <div className="bg-surface-soft rounded-3xl p-6 border border-border mb-8">
                  <div className="flex items-center gap-2 mb-4 text-text-muted">
                    <ReceiptText size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Selected Items</span>
                  </div>
                  <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="font-bold text-text">
                          {item.qty}x {item.name} 
                          <span className={`ml-2 text-[8px] px-2 py-0.5 rounded-full border ${item.type === 'urg' ? 'border-primary text-primary' : 'border-border text-text-muted'}`}>
                            {item.type.toUpperCase()}
                          </span>
                        </span>
                        <span className="font-black">Rs. {item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-lg font-black text-text">Total Bill</span>
                    <span className="text-2xl font-black text-primary">Rs. {cartTotal}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-text-muted ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input required className="w-full bg-surface border border-border p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" 
                          placeholder="Ali Ahmed" onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-text-muted ml-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input required type="tel" className="w-full bg-surface border border-border p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" 
                          placeholder="0326..." onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-text-muted ml-1">Babu Mehar Town Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input required className="w-full bg-surface border border-border p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm" 
                        defaultValue={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                  </div>

                  <button disabled={loading} className="group w-full bg-primary text-white p-5 rounded-2xl font-black shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>
                        Confirm & Request Pickup <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}