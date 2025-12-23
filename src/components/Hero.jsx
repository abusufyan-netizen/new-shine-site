import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Professional Care for Your Finest Wear
      </h1>
      <p className="text-xl mb-8 text-blue-100">
        Premium Dry Cleaning & Precision Pressing in Babu Mehar Town, Lahore.
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://wa.me/YOUR_PHONE_NUMBER" 
           className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
          Book a Pickup
        </a>
        <a href="#services" 
           className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition">
          View Prices
        </a>
      </div>
    </section>
  );
};

export default Hero;