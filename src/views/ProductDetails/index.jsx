import { useState } from "react";

export default function ProductDetails() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("features");
  const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userDetails, setUserDetails] = useState({
    address: "",
    phone: "",
  });

  const product = {
    name: "Premium Wireless Noise-Cancelling Headphones",
    brand: "SoundMaster",
    price: 299.99,
    rating: 4.7,
    reviewCount: 1283,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancelling technology, comfortable over-ear design, and long-lasting battery life.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0",
      "Comfortable memory foam ear cushions",
      "Voice assistant compatible",
    ],
    images: [
      "/images/earphone.jpg",
      "/images/earphone1.jpg",
      "/images/earphone2.jpg",
      "/images/earphone3.pngs",
    ],
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleBuyNowClick = () => {
    setShowBuyNowPopup(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setShowBuyNowPopup(false);
    setShowConfirmation(true);
  };

  const handleUserDetailsChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <img
              src={product.images[currentImage]}
              alt={`${product.name} - Image ${currentImage + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto py-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 ${
                  currentImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600">by {product.brand}</p>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="flex-1 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {["features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-6">
          {activeTab === "features" && (
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
          {activeTab === "specifications" && (
            <p>Detailed specifications would go here.</p>
          )}
          {activeTab === "reviews" && (
            <p>Customer reviews would be displayed here.</p>
          )}
        </div>
      </div>
      {showBuyNowPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Enter Shipping Details</h2>
            <form onSubmit={handleSubmitOrder}>
              <div className="mb-4">
                <label className="block text-gray-700">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={userDetails.address}
                  onChange={handleUserDetailsChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleUserDetailsChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <p className="font-bold">
                  Total Price: ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBuyNowPopup(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold">Order Placed!</h2>
            <p className="mt-4">Your order has been placed successfully.</p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
