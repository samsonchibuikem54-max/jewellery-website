import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    // Demo submission alert
    alert(
      `Message sent successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  // WhatsApp click handler
  const handleWhatsApp = () => {
    const phoneNumber = "09137153870";
    const message = "Hello, I need help with my order.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Email click handler
  const handleEmail = () => {
    window.location.href = "mailto:samsonchibuikem3@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 relative">
      {/* Main Contact Form */}
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <p className="text-center text-gray-600 mb-10">
          Have a question or need help? Send us a message or reach out directly
          via WhatsApp or Email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Options */}
      <div className="max-w-4xl mx-auto mt-12 flex justify-center gap-6">
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          <FaWhatsapp /> Chat on WhatsApp
        </button>

        <button
          onClick={handleEmail}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          <FaEnvelope /> Send Email
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
};

export default ContactPage;
