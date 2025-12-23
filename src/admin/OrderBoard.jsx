import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Clock, CheckCircle2, Waves, Zap, ReceiptText, Trash2, Archive } from 'lucide-react';

const STATUS_CONFIG = {
  Washing: { icon: <Waves size={16} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  Pressing: { icon: <Zap size={16} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  Ready: { icon: <CheckCircle2 size={16} />, color: 'text-green-500', bg: 'bg-green-500/10' }
};

const OrderBoard = ({ orders, setOrders, handlePrint }) => {
  
  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order? It will be removed from the database.")) {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (!error) {
        setOrders(prev => prev.filter(o => o.id !== id));
      }
    }
  };

  const archiveOrder = async (id) => {
    // We update the status to "Completed" so it disappears from the active columns
    const { error } = await supabase.from('orders').update({ status: 'Completed' }).eq('id', id);
    if (!error) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 p-2">
      {Object.keys(STATUS_CONFIG).map((status) => (
        <div key={status} className="flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-5 px-4">
            <h4 className={`font-black uppercase tracking-tighter flex items-center gap-2 ${STATUS_CONFIG[status].color}`}>
              {STATUS_CONFIG[status].icon} {status}
            </h4>
            <span className="text-xs font-bold bg-surface-soft px-3 py-1 rounded-full border border-border">
              {orders.filter(o => o.status === status).length}
            </span>
          </div>

          <div className="bg-surface-soft/40 border-2 border-dashed border-border rounded-[2.5rem] p-4 flex-grow space-y-4">
            {orders.filter(o => o.status === status).map((order) => (
              <motion.div
                layout
                key={order.id}
                className="bg-card border border-border p-5 rounded-3xl shadow-sm relative group"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-black text-primary">#{order.id.toString().slice(-3)}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handlePrint(order)} className="text-text-muted hover:text-primary"><ReceiptText size={14}/></button>
                    <button onClick={() => deleteOrder(order.id)} className="text-text-muted hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                </div>

                <p className="font-black text-text mb-1">{order.customer_name}</p>
                <p className="text-[11px] font-bold text-text-muted mb-4 flex items-center gap-1">
                  <Clock size={10}/> {order.item_count} items • {order.address.split(',')[0]}
                </p>

                <div className="flex gap-2">
                  {status === 'Washing' && (
                    <button onClick={() => updateStatus(order.id, 'Pressing')} className="w-full py-2 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded-xl border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all">START PRESSING</button>
                  )}
                  {status === 'Pressing' && (
                    <button onClick={() => updateStatus(order.id, 'Ready')} className="w-full py-2 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-xl border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">MARK READY</button>
                  )}
                  {status === 'Ready' && (
                    <button onClick={() => archiveOrder(order.id)} className="w-full py-2 bg-green-500 text-white text-[10px] font-black rounded-xl shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
                      <Archive size={12}/> COMPLETE & ARCHIVE
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBoard;