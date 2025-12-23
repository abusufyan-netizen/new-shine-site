import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappNumber = "923264500909";
  const message = encodeURIComponent("Hi New Shine! I'm interested in your laundry services. Can you help me with a pickup?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      
      {/* Smart Tooltip / Greeting */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="bg-white dark:bg-card px-4 py-2 rounded-2xl shadow-xl border border-border mb-2 hidden md:block"
      >
        <p className="text-sm font-bold text-text flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Questions? Chat with us!
        </p>
      </motion.div>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="relative group bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all overflow-visible"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Ring Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:hidden"></span>
        
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-surface flex items-center justify-center">
          1
        </span>

        <MessageCircle size={32} strokeWidth={2.5} />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full group-hover:shadow-[0_0_30px_#25D366] transition-all -z-10"></div>
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;