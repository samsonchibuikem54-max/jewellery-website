import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const trendingProducts = [
  { img: "/images/rings/11.jpg", name: "Sapphire Ring", price: "69,999" },
  { img: "/images/watchs/1.jpg", name: "Gold Earrings", price: "49,999" },
  { img: "/images/Bracelets/13.jpg", name: "Luxury Watch", price: "109,999" },
  { img: "/images/necks/14.jpg", name: "Diamond Bracelet", price: "89,999" },
  { img: "/images/Earrings/15.jpg", name: "Pearl Necklace", price: "79,999" },
];

const TrendingProducts = () => {
  return (
    <section id="trending" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-bold mb-4">Trending Now</h2>
          <p className="text-gray-400">Shop our most loved products</p>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={index}
              className="min-w-[220px] relative group rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{product.name}</h3>
                <p className="text-yellow-400 text-sm mb-3">{product.price}</p>
                <Link
                  to="/products"
                  className="text-sm border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition text-center"
                >
                  View Product
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
