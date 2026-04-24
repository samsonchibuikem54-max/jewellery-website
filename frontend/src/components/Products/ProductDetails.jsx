import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* price MUST be number */
const products = {
  watches: [
    { img: "/images/watchs/1.jpg", name: "Luxury Watch", price: 35000 },
    { img: "/images/watchs/2.jpg", name: "Classic Watch", price: 35000 },
    { img: "/images/watchs/3.jpg", name: "Smart Watch", price: 35000 },
    { img: "/images/watchs/4.jpg", name: "Gold Watch", price: 35000 },
    { img: "/images/watchs/5.jpg", name: "Silver Watch", price: 35000 },
    { img: "/images/watchs/7.jpg", name: "Silver Watch", price: 35000 },
    { img: "/images/watchs/15.jpg", name: "Silver Watch", price: 35000 },
    { img: "/images/watchs/20.jpg", name: "Silver Watch", price: 35000 },
    { img: "/images/watchs/30.jpg", name: "Silver Watch", price: 35000 },
    { img: "/images/watchs/25.jpg", name: "Silver Watch", price: 35000 },
  ],
  necklaces: [
    { img: "/images/necks/18.jpg", name: "Gold Necklace", price: 75999 },
    { img: "/images/necks/19.jpg", name: "Pearl Necklace", price: 19000 },
    { img: "/images/necks/21.jpg", name: "Diamond Necklace", price: 129999 },
    { img: "/images/necks/20.jpg", name: "Silver Necklace", price: 49999 },
    { img: "/images/necks/22.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/2.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/1.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/3.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/4.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/5.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/6.jpg", name: "Rose Necklace", price: 69999 },
    { img: "/images/necks/7.jpg", name: "Rose Necklace", price: 69999 },
  ],
  rings: [
    { img: "/images/rings/11.jpg", name: "Diamond Ring", price: 14999 },
    { img: "/images/rings/12.jpg", name: "Engagement Ring", price: 59999 },
    { img: "/images/rings/13.jpg", name: "Gold Ring", price: 44999 },
    { img: "/images/rings/14.jpg", name: "Silver Ring", price: 24999 },
    { img: "/images/rings/1.jpg", name: "Silver Ring", price: 24999 },
    { img: "/images/rings/2.jpg", name: "Silver Ring", price: 24999 },
    { img: "/images/rings/3.jpg", name: "Silver Ring", price: 24999 },
    { img: "/images/rings/4.jpg", name: "Silver Ring", price: 24999 },
    { img: "/images/rings/5.jpg", name: "Silver Ring", price: 24999 },
  ],
  bracelets: [
    { img: "/images/Bracelets/1.jpg", name: "Luxury Bracelet", price: 39999 },
    { img: "/images/Bracelets/2.jpg", name: "Silver Bangle", price: 19999 },
    { img: "/images/Bracelets/3.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/4.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/5.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/6.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/7.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/8.jpg", name: "Gold Bangle", price: 44999 },
    { img: "/images/Bracelets/9.jpg", name: "Gold Bangle", price: 44999 },
  ],
  earrings: [
    { img: "/images/Earrings/1.jpg", name: "Pearl Earrings", price: 89499 },
    { img: "/images/Earrings/2.jpg", name: "Gold Earrings", price: 44999 },
    { img: "/images/Earrings/3.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/4.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/5.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/6.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/7.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/8.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/9.jpg", name: "Diamond Earrings", price: 129999 },
    { img: "/images/Earrings/10.jpg", name: "Diamond Earrings", price: 129999 },
  ],
  caps: [
    { img: "/images/caps/1.jpg", name: "Classic Black Cap", price: 7999 },
    { img: "/images/caps/2.jpg", name: "Street Cap", price: 8999 },
    { img: "/images/caps/3.jpg", name: "Luxury Cap", price: 12999 },
    { img: "/images/caps/4.jpg", name: "Snapback Cap", price: 9999 },
    { img: "/images/caps/5.jpg", name: "Vintage Cap", price: 6999 },
  ],

  clothes: [
    { img: "/images/clothes/1.jpg", name: "Premium T-Shirt", price: 15999 },
    { img: "/images/clothes/2.jpg", name: "Hoodie", price: 25999 },
    { img: "/images/clothes/3.jpg", name: "Streetwear Jacket", price: 45999 },
    { img: "/images/clothes/4.jpg", name: "Casual Shirt", price: 19999 },
    { img: "/images/clothes/5.jpg", name: "Luxury Polo", price: 29999 },
  ],
};

const ProductDetails = () => {
  const { category, index } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productList = products[category];
  const productIndex = Number(index);
  const product = productList?.[productIndex];

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product?.img) {
      setMainImage(product.img);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-yellow-400 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${category}-${productIndex}`, // UNIQUE ID
      name: product.name,
      price: product.price,
      img: product.img,
      category,
      quantity: 1,
    });

    navigate("/cart");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* PRODUCT SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
            />

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {productList.map((p, i) => (
                <img
                  key={i}
                  src={p.img}
                  alt={p.name}
                  onClick={() => setMainImage(p.img)}
                  className={`w-20 h-20 cursor-pointer rounded-lg object-cover border-2
                    ${
                      mainImage === p.img
                        ? "border-yellow-400"
                        : "border-gray-300 hover:border-yellow-400"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="text-yellow-500 text-2xl mb-6">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-gray-700 mb-8">
              Premium quality jewellery crafted with excellence.
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE */}
        <section>
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {productList.map((item, i) =>
              i !== productIndex ? (
                <SwiperSlide key={i}>
                  <Link
                    to={`/product/${category}/${i}`}
                    className="block bg-white rounded-xl shadow hover:shadow-lg transition"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-56 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-yellow-500 text-sm">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ) : null,
            )}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
