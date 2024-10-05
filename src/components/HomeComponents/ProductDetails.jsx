import { useState } from "react";
// import { categories } from "../../utils/data";

export default function ProductCategories({categories=[]}) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id} // Use _id as the unique key
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="relative aspect-square">
              <img
                src={category.image} // Image URL from the API
                alt={category.name}
                className="h-[300px] object-cover w-full"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2> {/* Category name from the API */}
              <a
                href="#"
                className={`inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 ${
                  hoveredCategory === category._id ? "underline" : ""
                }`}
              >
                Shop {category.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
