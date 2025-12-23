import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sparkles, Wind, ShieldCheck, Droplets, Zap } from 'lucide-react';

const SERVICES = [
  {
    title: "Premium Dry Clean",
    price: "From Rs. 350",
    description: "Eco-friendly solvent cleaning for delicate fabrics like silk, wool, and wedding wear.",
    icon: <Sparkles size={28} />,
    features: ["Perc-Free Solvent", "Stain Removal", "Hand Finishing"],
    popular: true
  },
  {
    title: "Steam Pressing",
    price: "From Rs. 80",
    description: "Industrial-grade vacuum steam tables for a crisp, wrinkle-free finish without fabric burn.",
    icon: <Wind size={28} />,
    features: ["Sharp Creases", "Hanger/Folded Option", "Anti-Shine Tech"],
    popular: false
  },
  {
    title: "Wash & Fold",
    price: "From Rs. 150",
    description: "Hygienic separate washing for daily wear, professionally folded and ready for the drawer.",
    icon: <Droplets size={28} />,
    features: ["Antibacterial Rinse", "Fabric Softening", "Color Protection"],
    popular: false
  },
  {
    title: "Couture Care",
    price: "Custom Quote",
    description: "Specialized treatment for high-end designer wear, sherwanis, and heavy bridal lehengas.",
    icon: <ShieldCheck size={28} />,
    features: ["Detail Protection", "PH-Neutral Wash", "Box Packaging"],
    popular: false
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -12 }}
      className="relative bg-card border border-border p-8 rounded-[2.5rem] transition-all hover:shadow-[0_20px_50px_var(--color-glow)] group flex flex-col h-full"
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          Most Popular
        </div>
      )}

      {/* Icon Container */}
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
        {service.icon}
      </div>

      <h3 className="text-2xl font-black mb-3 text-text tracking-tight group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <p className="text-text-muted mb-8 text-sm leading-relaxed flex-grow">
        {service.description}
      </p>

      {/* Functional Feature List */}
      <ul className="space-y-3 mb-8 border-t border-border pt-6">
        {service.features.map((feat, i) => (
          <li key={i} className="flex items-center gap-2 text-xs font-bold text-text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50" />
            {feat}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-primary font-black text-xl">{service.price}</span>
        <button className="p-2 rounded-xl bg-surface-soft text-text hover:bg-primary hover:text-white transition-all">
          <Zap size={18} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-text">
            Specialized <span className="text-primary italic">Solutions.</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            From daily essentials to your most precious heirloom garments, we provide the specific care each fabric demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}