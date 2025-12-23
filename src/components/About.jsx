import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Clock, Leaf } from 'lucide-react';

const About = () => {
  // Stats data to make the section more dynamic
  const stats = [
    { label: 'Years Experience', value: '10+', icon: <Award className="w-5 h-5" /> },
    { label: 'Happy Customers', value: '5K+', icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: 'Daily Capacity', value: '200+', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-surface transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Animated Image with "Floating" Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-surface-soft">
              <img 
                src="/shop-front.jpg" 
                alt="New Shine Clean & Press Lahore" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                The New Shine Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-text mb-6 leading-tight">
                Garment Care Tailored to <span className="text-primary">Perfection.</span>
              </h2>
              
              <p className="text-text-muted text-lg mb-6 leading-relaxed">
                Located in <strong>Babu Mehar Town, Lahore</strong>, we don't just wash clothes—we restore them. Our mission is to provide premium care using eco-friendly technology that preserves the lifespan of your wardrobe.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 text-text font-semibold">
                  <div className="text-primary"><Leaf size={20} /></div>
                  Eco-Solvent Cleaning
                </div>
                <div className="flex items-center gap-3 text-text font-semibold">
                  <div className="text-primary"><CheckCircle2 size={20} /></div>
                  3-Point Inspection
                </div>
                <div className="flex items-center gap-3 text-text font-semibold">
                  <div className="text-primary"><Clock size={20} /></div>
                  Same-Day Delivery
                </div>
                <div className="flex items-center gap-3 text-text font-semibold">
                  <div className="text-primary"><Award size={20} /></div>
                  Master Pressing
                </div>
              </div>

              {/* Dynamic Stats Row */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-surface-soft rounded-3xl border border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-primary flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-2xl font-black text-text">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold text-text-muted tracking-tighter">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;