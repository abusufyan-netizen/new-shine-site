const services = [
  { name: "Executive Suit Pressing", price: "Rs. 300", desc: "Crisp lines and lapel shaping." },
  { name: "Traditional Wear", price: "Rs. 450", desc: "Expert care for heavy Shalwar Kameez." },
  { name: "Stain Removal", price: "From Rs. 150", desc: "Deep fiber treatment for tough spots." },
];

const Services = () => {
  return (
    <section id="services" className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 className="text-xl font-bold mb-2">{s.name}</h3>
            <p className="text-gray-600 mb-4">{s.desc}</p>
            <span className="text-blue-600 font-bold text-lg">{s.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;