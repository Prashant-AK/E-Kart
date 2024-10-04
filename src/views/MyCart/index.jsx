import { useState } from "react";
import ProductCategories from "../../components/HomeComponents/ProductDetails";

const initialCartItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function MyCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md mr-4 h-[64px] w-[64px]"
                          />
                          <span className="font-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4">${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductCategories />
    </div>
  );
}
