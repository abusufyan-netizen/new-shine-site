import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import PriceEstimator from '../components/PriceEstimator';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  // Bonus: Reading progress bar at the very top of the page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-surface selection:bg-primary selection:text-white">
      {/* 1. Global Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[2001] origin-left" 
        style={{ scaleX }} 
      />

      <Navbar />

      <main>
        {/* HERO: The Hook */}
        <section id="home">
          <Hero />
        </section>

        {/* ABOUT: The Story */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          id="about"
        >
          <About />
        </motion.section>

        {/* SERVICES: The Value */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          id="services"
        >
          <Services />
        </motion.section>

        {/* ESTIMATOR: The Conversion */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="estimator"
          className="bg-surface-soft/30"
        >
          <PriceEstimator />
        </motion.section>
      </main>

      <Footer />
      
      {/* PERSISTENT UI */}
      <FloatingWhatsApp />
    </div>
  );
}