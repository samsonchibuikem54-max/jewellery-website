import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import products from "../../data/products";

import "swiper/css";
import "swiper/css/navigation";

// Reusable Product Section
const ProductSection = ({ title, items, category }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewProduct = (index) => {
    if (!user) {
      alert("Please login or register to view products");
      navigate("/login");
    } else {
      navigate(`/product/${category}/${index}`);
    }
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((product, index) => (
          <SwiperSlide key={`${category}-${index}`}>
            <div className="group relative overflow-hidden rounded-xl border hover:shadow-lg transition">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{product.name}</h3>
                <p className="text-yellow-400 text-sm mb-3">
                  ₦{product.price.toLocaleString()}
                </p>

                <button
                  onClick={() => handleViewProduct(index)}
                  className="border border-yellow-400 text-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
                >
                  View Product
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// Main Page
const ProductsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center py-12">Our Products</h1>

        <ProductSection
          title="Watches"
          items={products.watches}
          category="watches"
        />
        <ProductSection
          title="Necklaces"
          items={products.necklaces}
          category="necklaces"
        />
        <ProductSection title="Rings" items={products.rings} category="rings" />
        <ProductSection
          title="Bracelets"
          items={products.bracelets}
          category="bracelets"
        />
        <ProductSection
          title="Earrings"
          items={products.earrings}
          category="earrings"
        />
        <ProductSection title="Caps" items={products.caps} category="caps" />
        <ProductSection
          title="Clothes"
          items={products.clothes}
          category="clothes"
        />
      </div>
    </div>
  );
};

export default ProductsPage;
