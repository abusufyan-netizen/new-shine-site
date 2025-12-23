import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  Package, Tag, TrendingUp, Clock, Plus, ReceiptText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from './AdminLayout'; 
import OrderBoard from './OrderBoard'; 

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchData();
    const orderSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders(prev => [payload.new, ...prev]);
        new Audio('/notification.mp3').play().catch(() => {});
      }).subscribe();
    return () => supabase.removeChannel(orderSubscription);
  }, []);

  async function fetchData() {
    const { data: sData } = await supabase.from('services').select('*').order('name');
    const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setServices(sData || []);
    setOrders(oData || []);
    setLoading(false);
  }

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Receipt #${order.id}</title></head>
        <style>
          body { font-family: 'Courier New', monospace; padding: 20px; width: 300px; }
          .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; }
          .flex { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
          .total { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-weight: bold; }
        </style>
        <body>
          <div class="header"><h3>NEW SHINE</h3><p>Babu Mehar Town, Lahore</p></div>
          <p>Order: #${order.id}<br>Cust: ${order.customer_name}</p>
          <hr/>
          ${order.order_details?.map(item => `
            <div class="flex"><span>${item.qty}x ${item.name} (${item.type})</span><span>Rs.${item.price * item.qty}</span></div>
          `).join('')}
          <div class="total flex"><span>TOTAL</span><span>Rs.${order.total_price}</span></div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <OrderBoard orders={orders} setOrders={setOrders} handlePrint={handlePrint} />
          </motion.div>
        )}
        {activeTab === 'inventory' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Your existing Price Manager Table */}
           </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}