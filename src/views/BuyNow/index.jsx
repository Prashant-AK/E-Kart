import React, { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  Truck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const ProductImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-64 object-cover rounded-lg shadow-md"
  />
);

const QuantitySelector = ({ quantity, setQuantity }) => (
  <div className="flex items-center border rounded-md">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="p-2 hover:bg-gray-100"
      aria-label="Decrease quantity"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="px-4 py-2 text-center w-12">{quantity}</span>
    <button
      onClick={() => setQuantity(quantity + 1)}
      className="p-2 hover:bg-gray-100"
      aria-label="Increase quantity"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

const OrderSummary = ({ price, quantity, shippingCost }) => {
  const subtotal = price * quantity;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default function BuyNowPage() {
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const product = {
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.5,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and a comfortable over-ear design, these headphones are perfect for music lovers and professionals alike.",
    image: "/placeholder.svg?height=400&width=400",
    shippingCost: 9.99,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the order submission
    console.log("Order submitted", {
      quantity,
      shippingAddress,
      paymentMethod,
    });
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Buy Now: {product.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ProductImage src={product.image} alt={product.name} />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} out of 5
              </span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="font-semibold">Quantity:</span>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shipping Address
              </label>
              <textarea
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="mr-2"
                  />
                  PayPal
                </label>
              </div>
            </div>
            <OrderSummary
              price={product.price}
              quantity={quantity}
              shippingCost={product.shippingCost}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </form>
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="w-5 h-5 mr-2" />
              Free shipping on orders over $500
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CreditCard className="w-5 h-5 mr-2" />
              Secure payment processing
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 mr-2" />
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
