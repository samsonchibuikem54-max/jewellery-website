import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const products = [
  { img: "/images/necks/1.jpg", name: "Gold Necklace", price: "75,999" },
  { img: "/images/necks/2.jpg", name: "Diamond Ring", price: "14,999" },
  { img: "/images/Earrings/3.jpg", name: "Pearl Earrings", price: "89,499" },
  { img: "/images/Bracelets/4.jpg", name: "Luxury Bracelet", price: "39,999" },
  { img: "/images/rings/5.jpg", name: "Wedding Set", price: "129,999" },
  { img: "/images/rings/6.jpg", name: "Silver Chain", price: "19,999" },
  { img: "/images/watchs/7.jpg", name: "Gold Bangle", price: "44,999" },
  { img: "/images/watchs/8.jpg", name: "Engagement Ring", price: "59,999" },
  { img: "/images/Earrings/9.jpg", name: "Luxury Watch", price: "99,999" },
  { img: "/images/Bracelets/10.jpg", name: "Pearl Pendant", price: "29,999" },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-black py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-white text-4xl font-bold mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-400">
            Handpicked jewellery for unforgettable moments
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* IMAGE */}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-72 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 w-full p-4 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-white font-semibold">{product.name}</h3>
                  <p className="text-yellow-400 text-sm mb-3">
                    {product.price}
                  </p>

                  {/* LINK TO PRODUCTS PAGE */}
                  <Link
                    to="/products"
                    className="text-sm border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-20">
          <Link
            to="/products"
            className="border border-yellow-400 text-yellow-400 px-12 py-3 hover:bg-yellow-400 hover:text-black transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
