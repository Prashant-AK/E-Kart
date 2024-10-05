import React, { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { ChangeDateFormat } from "../../utils/helper.js";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesMutation,
  useGetCategoriesByIdMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/category/categoryApiSlice.js";
import {
  useDeleteProductMutation,
  useGetAllProductsMutation,
  useGetProductByIdMutation,
} from "../../store/product/productApiSlice.js";
import { postUserFormData } from "../../store/ApiSlice.js";

const CATEGORIES = [
  { name: "Category A", image: "" },
  { name: "Category B", image: "" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    price: 19.99,
    image: "",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    price: 29.99,
    image: "",
  },
];

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null, // New field for image URL
  });
  const [newCategory, setNewCategory] = useState({ name: "", image: "" }); // Category with image
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  // Api Mutations
  const [
    getAllProducts,
    { isLoading: productsLoading, data: AllProductsList },
  ] = useGetAllProductsMutation();
  const [getProduct, { isLoading: productLoading, data: productDetails }] =
    useGetProductByIdMutation();

  const [
    deleteProduct,
    { isLoading: productDeleting, data: productDeletingResponse },
  ] = useDeleteProductMutation();
  const [
    getAllCategories,
    { isLoading: categoriesLoading, data: AllCategoriesList },
  ] = useGetAllCategoriesMutation();
  const [
    addCategory,
    { isLoading: categoryAdding, data: categoryAddResponse },
  ] = useCreateCategoryMutation();
  const [
    deleteCategory,
    { isLoading: categoryDeleting, data: categoryDeletingResponse },
  ] = useDeleteCategoryMutation();
  const [
    updateCategory,
    { isLoading: categoryUpdating, data: categoryUpdatingResponse },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (AllCategoriesList) {
      setCategories(AllCategoriesList);
    }
  }, [AllCategoriesList]);

  useEffect(() => {
    if (AllProductsList) {
      setProducts(AllProductsList);
    }
  }, [AllProductsList]);

  useEffect(() => {
    if (categoryAddResponse) {
      toast.success("Category added successfully");
      getAllCategories();
    }
  }, [categoryAddResponse]);
  useEffect(() => {
    if (categoryDeletingResponse) {
      toast.success("Category Deleted successfully");
      getAllCategories();
    }
  }, [categoryDeletingResponse]);
  useEffect(() => {
    if (productDeletingResponse) {
      toast.success("Product Deleted successfully");
      getAllProducts();
    }
  }, [productDeletingResponse]);

  const addProduct = async () => {
    if (
      newProduct?.name &&
      newProduct?.description &&
      newProduct?.category &&
      newProduct?.price &&
      newProduct?.image
    ) {
      const formData = new FormData();
      formData.append("name", newProduct?.name);
      formData.append("description", newProduct?.description);
      formData.append("category", newProduct?.category?.id);
      formData.append("price", newProduct?.price);
      formData.append("countInStock", newProduct?.countInStock);
      formData.append("image", newProduct?.image);
      const response = await postUserFormData("products", formData);
      if (response) {
        toast.success("Product added successfully");
        setNewProduct({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
          countInStock: 0,
        });
        getAllProducts();
      }
      // setProducts([...products, { id: Date.now(), ...newProduct }]);
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct({ id });
    // setProducts(products.filter((product) => product.id !== id));
  };

  const handleAddCategory = () => {
    if (
      newCategory.name &&
      !categories.find((c) => c.name === newCategory.name) &&
      newCategory.image
    ) {
      // setCategories([...categories, newCategory]);
      addCategory({ body: newCategory });
      setNewCategory({ name: "", image: "" });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory({ id: categoryId });
  };
  const handleShowProductDetails = (id) => {
    getProduct({ id });
    setShowProduct(true);
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
            type="number"
            placeholder="Stock No."
            value={newProduct.countInStock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, countInStock: e.target.value })
            }
            className="border rounded-md px-3 py-2 w-32"
          />
          <input
            type="file"
            placeholder="Select Image"
            // value={newProduct?.image ?null}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.files[0] })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct?.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="border rounded-md px-3 py-2 flex items-center justify-between w-48"
            >
              {newProduct?.category?.name || "Select Category"}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
                {categories?.map((category) => (
                  <button
                    key={category?.name}
                    onClick={() => {
                      setNewProduct({
                        ...newProduct,
                        category: { id: category.id, name: category?.name },
                      });
                      setShowCategoryDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {category?.name}
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
            {products?.map((product) => (
              <tr key={product?.id}>
                <td className="border p-2">
                  {product?.image ? (
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{product?.name}</td>
                <td className="border p-2">{product?.category?.name}</td>
                <td className="border p-2">${product?.price}</td>
                <td className="border p-2 text-right">
                  <button
                    className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 mr-2"
                    onClick={() => handleShowProductDetails(product?.id)}
                  >
                    <Eye className="h-4 w-4 " />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product?.id)}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showProduct && productDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p>
                <strong>Product ID:</strong> {productDetails?.id}
              </p>
              <p>
                <strong>Name:</strong>
                {productDetails?.name}
              </p>
              <p>
                <strong>Brand:</strong> {productDetails?.brand}
              </p>
              <p>
                <strong>Category:</strong> {productDetails?.category?.name}
              </p>
              <p>
                <strong>Price:</strong> {productDetails?.price}
              </p>
              <p>
                <strong>Count In Stock :</strong>
                {productDetails?.countInStock}
              </p>

              <p>
                <strong>Description:</strong> {productDetails?.description}
              </p>
              <p>
                <strong>Is Featured:</strong>{" "}
                {productDetails?.isFeatured ? "Yes" : "No"}
              </p>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowProduct(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manage Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Manage Categories</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory?.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCategory?.image}
            onChange={(e) =>
              setNewCategory({ ...newCategory, image: e.target.value })
            }
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <button
            onClick={handleAddCategory}
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
            {categories?.map((category) => (
              <tr key={category?.name}>
                <td className="border p-2">
                  {category?.image ? (
                    <img
                      src={category?.image}
                      alt={category?.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{category?.name}</td>
                <td className="border p-2 text-right">
                  <button
                    onClick={() => handleDeleteCategory(category?.id)}
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
