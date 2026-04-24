const categories = [
  { name: "Rings", img: "/images/rings/10.jpg" },
  { name: "Necklaces", img: "/images/necks/16.jpg" },
  { name: "Earrings", img: "/images/Earrings/20.jpg" },
  { name: "Bracelets", img: "/images/Bracelets/10.jpg" },
  { name: "Watches", img: "/images/watchs/17.jpg" },
  // { name: "cap", img: "/images/watchs/17.jpg" },
];

const CategoriesSection = () => {
  return (
    <section className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-400">Explore our wide range of jewellery</p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
