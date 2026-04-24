import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-white font-bold text-xl mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#categories" className="hover:text-yellow-400 transition">Shop</a></li>
            <li><a href="#about-us" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#customer-reviews" className="hover:text-yellow-400 transition">Reviews</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </motion.div>

        {/* NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-white font-bold text-xl mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-lg w-full sm:w-auto flex-1"
            />
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-black hover:text-yellow-400 transition">
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* SOCIAL MEDIA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-white font-bold text-xl mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
          </div>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 mt-12 text-sm">
        &copy; {new Date().getFullYear()} [Your Brand Name]. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
