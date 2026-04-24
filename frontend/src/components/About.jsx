import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section id="about-us" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-12">
        {/* IMAGE */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/images/watchs/3.jpg"
            alt="About Us"
            className="w-full h-auto rounded-xl object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400 mb-6">
            At [Your Brand Name], we craft jewellery that captures timeless
            elegance and sophistication. Our passion for design and attention to
            detail ensures that every piece is not just an accessory, but a
            statement of luxury.
          </p>
          <p className="text-gray-400">
            From classic designs to modern masterpieces, we believe in creating
            jewellery that tells a story, celebrates individuality, and leaves a
            lasting impression.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
