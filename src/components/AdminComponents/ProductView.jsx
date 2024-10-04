import React, { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";

const ProductsView = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      category: "Category A",
      price: 19.99,
      imageUrl: "",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category B",
      price: 29.99,
      imageUrl: "",
    },
  ]);
  const [categories, setCategories] = useState([
    { name: "Category A", imageUrl: "" },
    { name: "Category B", imageUrl: "" },
  ]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "", // New field for image URL
  });
  const [newCategory, setNewCategory] = useState({ name: "", imageUrl: "" }); // Category with image
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const addProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.imageUrl
    ) {
      setProducts([...products, { id: Date.now(), ...newProduct }]);
      setNewProduct({ name: "", category: "", price: "", imageUrl: "" });
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const addCategory = () => {
    if (
      newCategory.name &&
      !categories.find((c) => c.name === newCategory.name) &&
      newCategory.imageUrl
    ) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: "", imageUrl: "" });
    }
  };

  const deleteCategory = (categoryName) => {
    setCategories(
      categories.filter((category) => category.name !== categoryName)
    );
    setProducts(
      products.filter((product) => product.category !== categoryName)
    );
  };

  return (
    <div className="space-y-6">
      {/* Manage Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-32"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="border rounded-md px-3 py-2 flex items-center justify-between w-48"
            >
              {newProduct.category || "Select Category"}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setNewProduct({ ...newProduct, category: category.name });
                      setShowCategoryDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Product
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2 text-right">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Manage Categories</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCategory.imageUrl}
            onChange={(e) =>
              setNewCategory({ ...newCategory, imageUrl: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <button
            onClick={addCategory}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Category
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Category Name</th>
              <th className="border p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.name}>
                <td className="border p-2">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2 text-right">
                  <button
                    onClick={() => deleteCategory(category.name)}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsView;
