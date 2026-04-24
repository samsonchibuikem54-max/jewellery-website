import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ada Uche",
    role: "Fashion Blogger",
    text: "Absolutely love the craftsmanship! Every piece feels luxurious and unique.",
    img: "/images/rings/7.jpg",
  },
  {
    name: "Emeka Obi",
    role: "Jewellery Enthusiast",
    text: "High-quality and elegant designs. My friends always ask where I got my jewellery.",
    img: "/images/necks/7.jpg",
  },
  {
    name: "Chioma Eze",
    role: "Entrepreneur",
    text: "Excellent service and stunning pieces. Shopping here is always a pleasure.",
    img: "/images/watchs/7.jpg",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADER */}
        <motion.h2
          className="text-white text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hear from our satisfied clients who love our jewellery.
        </motion.p>

        {/* TESTIMONIALS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              className="bg-black/70 rounded-xl p-6 text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <p className="text-gray-300 mb-4">"{testi.text}"</p>
              <div className="flex items-center space-x-4">
                <img
                  src={testi.img}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testi.name}</h4>
                  <p className="text-gray-400 text-sm">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
