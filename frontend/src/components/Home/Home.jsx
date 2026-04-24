// src/components/Home/Home.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedProducts from "../FeaturedProducts";
import CategoriesSection from "../Categories";
import TrendingProducts from "../Trending";
import PromotionsBanner from "../Promotions";
import Testimonials from "../Testimonials";
import AboutUs from "../About";
import CustomerReviews from "../Customer";
import Footer from "../Footer";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  return (
    <div className="w-full">
      {/* ====================== */}
      {/* HERO (Navbar-safe) */}
      {/* ====================== */}
      <div className="pt-64 md:pt-0">
        <div className="w-full h-[75vh] sm:h-[80vh] md:h-[85vh] relative">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="h-full"
          >
            {/* SLIDE 1 */}
            <SwiperSlide>
              <div
                className="relative h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/rings/5.jpg')",
                }}
              >
                <div className="bg-black/60 w-full h-full flex items-center px-4 sm:px-8 md:px-20">
                  <div className="text-white max-w-xl text-center md:text-left">
                    <img
                      src="/images/rings/6.jpg"
                      alt="Female Jewellery"
                      className="w-28 sm:w-32 md:w-40 mx-auto md:mx-0 mb-3"
                    />

                    <p className="uppercase text-xs tracking-widest text-yellow-400">
                      exclusive offer -20% off
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold my-2">
                      Necklace
                    </h1>

                    <p className="text-sm sm:text-base">
                      22 Carat gold necklace for wedding
                    </p>

                    <p className="mt-2 text-sm sm:text-base">
                      Starting at{" "}
                      <span className="text-yellow-400 font-semibold">
                        ₦75,999
                      </span>
                    </p>

                    <button className="mt-4 border border-yellow-400 px-6 py-2 text-sm sm:text-base hover:bg-yellow-400 hover:text-black transition">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Side image */}
                <div className="hidden md:block absolute right-0 bottom-0">
                  <img
                    src="/images/rings/10.jpg"
                    alt="Necklace"
                    className="w-80 lg:w-96 object-contain scale-x-[-1]"
                  />
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 2 */}
            <SwiperSlide>
              <div
                className="relative h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/rings/5.jpg')",
                }}
              >
                <div className="bg-black/60 w-full h-full flex items-center px-4 sm:px-8 md:px-20">
                  <div className="text-white max-w-xl text-center md:text-left">
                    <img
                      src="/images/watchs/8.jpg"
                      alt="Watch"
                      className="w-28 sm:w-32 md:w-40 mx-auto md:mx-0 mb-3"
                    />

                    <p className="uppercase text-xs tracking-widest text-yellow-400 mb-10">
                      exclusive offer -40% off
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold my-2">
                      Earrings & Pendant
                    </h1>

                    <p className="text-sm sm:text-base">
                      Complete bridal set with white pearls
                    </p>

                    <p className="mt-2 text-sm sm:text-base">
                      Starting at{" "}
                      <span className="text-yellow-400 font-semibold">
                        ₦89,499
                      </span>
                    </p>

                    <button className="mt-4 border border-yellow-400 px-6 py-2 text-sm sm:text-base hover:bg-yellow-400 hover:text-black transition">
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="hidden md:block absolute right-0 bottom-0">
                  <img
                    src="/images/rings/10.jpg"
                    alt="Necklace"
                    className="w-80 lg:w-96 object-contain scale-x-[-1]"
                  />
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 3 */}
            <SwiperSlide>
              <div
                className="relative h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/rings/5.jpg')" }}
              >
                <div className="bg-black/50 w-full h-full flex items-center px-4 sm:px-8 md:px-20">
                  <div className="text-white max-w-xl text-center md:text-left">
                    <img
                      src="/images/necks/2.jpg"
                      alt="Wedding Rings"
                      className="w-28 sm:w-32 md:w-40 mx-auto md:mx-0 mb-3"
                    />

                    <p className="uppercase text-xs tracking-widest text-yellow-400">
                      exclusive offer -10% off
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold my-2">
                      Wedding Rings
                    </h1>

                    <p className="text-sm sm:text-base">
                      Special wedding rings for couples
                    </p>

                    <p className="mt-2 text-sm sm:text-base">
                      Starting at{" "}
                      <span className="text-yellow-400 font-semibold">
                        ₦14,999
                      </span>
                    </p>

                    <button className="mt-4 border border-yellow-400 px-6 py-2 text-sm sm:text-base hover:bg-yellow-400 hover:text-black transition">
                      Shop Now
                    </button>
                    
                  </div>
                </div>
               <div className="hidden md:block absolute right-0 bottom-0">
                  <img
                    src="/images/rings/10.jpg"
                    alt="Necklace"
                    className="w-80 lg:w-96 object-contain scale-x-[-1]"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* ====================== */}
      {/* OTHER SECTIONS */}
      {/* ====================== */}
      <FeaturedProducts />
      <CategoriesSection />
      <TrendingProducts />
      <PromotionsBanner />
      <Testimonials />
      <AboutUs />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default Home;
