import { motion } from "framer-motion";

const customerReviews = [
  { name: "Amina Bello", rating: 5, text: "Fantastic quality and elegant designs!" },
  { name: "Tunde Akin", rating: 4, text: "Beautiful jewellery, very satisfied with my purchase." },
  { name: "Chioma Nwosu", rating: 5, text: "Fast delivery and exquisite pieces!" },
];

const CustomerReviews = () => {
  return (
    <section id="customer-reviews" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADER */}
        <motion.h2
          className="text-white text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Customer Reviews
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Real feedback from our valued customers
        </motion.p>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {customerReviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-black/70 rounded-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">&#9733;</span>
                ))}
              </div>
              <p className="text-gray-300 mb-3">"{review.text}"</p>
              <h4 className="text-white font-semibold">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
