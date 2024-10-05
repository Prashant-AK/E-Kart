import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";
import toast from "react-hot-toast";

// Reusable ProductCard component
function ProductCard({ product }) {
  const dispatch = useDispatch(); // Get the dispatch function
  const [quantity, setQuantity] = useState(1); // State to track quantity

  // Handle Add to Cart action
  const handleAddToCart = () => {
    console.log("handle add to cart");
    if (product.countInStock >= quantity) {
      console.log("inside if", product);
      dispatch(addToCart({ ...product, quantity })); // Pass quantity with product
      toast.success(`${quantity} x ${product.name} added to cart!`); // Show success message
    } else {
      toast.error(`Only ${product.countInStock} items available!`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="h-[300px] w-[300px] object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118L10 13.011l-2.8 2.034c-.783.57-1.839-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.567 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600">
            ({product.numReviews} reviews)
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-${product.countInStock > 0 ? "green" : "red"}-600`}
          >
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
          {/* Quantity Selector */}
          <div>
            <label htmlFor="quantity" className="mr-2">
              Qty:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-1 rounded-md"
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function FeaturedProduct({
  products = [],
  title = "",
  showAllProducts = false,
}) {
  // Filter the products based on the condition
  const filteredProducts = showAllProducts
    ? products
    : products.filter((product) => product.isFeatured);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-left">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProduct;
