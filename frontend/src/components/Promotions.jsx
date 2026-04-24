import { motion } from "framer-motion";

const PromotionsBanner = () => {
  return (
    <section id="promotions" className="py-28 bg-yellow-400">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Limited Time Offer!
        </motion.h2>
        <motion.p
          className="text-black text-lg mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Get up to 30% off on selected luxury jewellery collections.
        </motion.p>
        <motion.button
          className="bg-black text-yellow-400 px-10 py-3 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default PromotionsBanner;
