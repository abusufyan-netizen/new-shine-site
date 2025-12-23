import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';

const Hero = () => {
  // Animation variants for staggered text appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-surface">
      
      {/* 1. Sophisticated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -left-[10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[130px]"
        />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* 2. Left Side: Value Proposition */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">Lahore's #1 Premium Laundry</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black text-text leading-[0.9] mb-8 tracking-tighter"
          >
            Dress to <br />
            <span className="text-primary italic">Impress.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-text-muted mb-10 max-w-lg leading-relaxed"
          >
            At <span className="text-text font-bold">New Shine</span>, we combine artisanal care with European cleaning technology to give your wardrobe a second life.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
            <button className="relative group overflow-hidden bg-primary text-white px-10 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-primary/40 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Book a Pickup <Zap size={20} fill="currentColor" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <button className="bg-surface border border-border text-text px-10 py-5 rounded-2xl font-bold hover:bg-surface-soft transition-all active:scale-95">
              View Services
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="mt-12 flex items-center gap-8 border-t border-border pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-soft overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-500 gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm font-bold text-text">500+ Happy Clients in Lahore</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Right Side: Interactive Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Main Hero Image with Glassmorphism Overlay */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1545173153-936277f369d7?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-[600px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              alt="Premium Dry Cleaning"
            />
            {/* Glass Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 -left-10 p-6 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4 text-primary">
                <ShieldCheck size={30} />
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase">Protection</p>
                  <p className="text-sm font-black text-text">Fabric Safe Tech</p>
                </div>
              </div>
            </motion.div>

            {/* Glass Card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 -right-10 p-6 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4 text-green-500">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase">Fast Track</p>
                  <p className="text-sm font-black text-text">24h Express</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;