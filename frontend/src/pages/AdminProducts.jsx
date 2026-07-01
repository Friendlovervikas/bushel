import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function AdminProducts() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

const [categoryFilter, setCategoryFilter] =
  useState("All");

const [stockFilter, setStockFilter] =
  useState("All");
  const [editingId, setEditingId] = useState(null);

 const [formData, setFormData] = useState({
  name: "",
  description: "",
  category: "Fruit",
  image: "",
  price: "",
  offerPrice: "",
  stock: "",
  unit: "Piece",
  status: "Available",
});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateProduct(
          editingId,
          formData,
          user.token
        );

        alert("Product Updated");
      } else {
        await createProduct(
          formData,
          user.token
        );

        alert("Product Added");
      }

      setFormData({
  name: "",
  description: "",
  category: "Fruit",
  image: "",
  price: "",
  offerPrice: "",
  stock: "",
  unit: "Piece",
  status: "Available",
});

      setEditingId(null);

      loadProducts();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

   setFormData({
  name: product.name,
  description: product.description,
  category: product.category,
  image: product.image,
  price: product.price,
  offerPrice: product.offerPrice,
  stock: product.stock,
  unit: product.unit,
  status: product.status,
});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await deleteProduct(id, user.token);

      alert("Product Deleted");

      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = products.filter(
  (product) => {

    const matchesSearch =
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock"
        ? product.stock > 0
        : product.stock === 0);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStock
    );

  }
);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Product Management
      </h1>

      {isAdmin && (

<div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
  type="number"
  name="offerPrice"
  placeholder="Offer Price"
  value={formData.offerPrice}
  onChange={handleChange}
  className="border p-3 rounded-lg"
/>
<select
  name="unit"
  value={formData.unit}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option>Piece</option>
  <option>Kg</option>
  <option>Gram</option>
  <option>Liter</option>
  <option>ML</option>
</select>
<select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option>Available</option>
  <option>Out of Stock</option>
</select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Fruit</option>
            <option>Juice</option>
            <option>Meal</option>
            <option>Combo</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </div>
      )}
      <div className="bg-white rounded-xl shadow p-6 mb-8">

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search Product..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border p-3 rounded-lg"
    />

    <select
      value={categoryFilter}
      onChange={(e) =>
        setCategoryFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    >
      <option value="All">
        All Categories
      </option>

      <option value="Fruit">
        Fruit
      </option>

      <option value="Juice">
        Juice
      </option>

      <option value="Meal">
        Meal
      </option>

      <option value="Combo">
        Combo
      </option>

    </select>

    <select
      value={stockFilter}
      onChange={(e) =>
        setStockFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    >
      <option value="All">
        All Stock
      </option>

      <option value="In Stock">
        In Stock
      </option>

      <option value="Out of Stock">
        Out of Stock
      </option>

    </select>

  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
<th>Offer</th>
<th>Unit</th>
<th>Status</th>
<th>Stock</th>
<th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
  key={product._id}
  className="border-b text-center"
>
  <td className="p-3">
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 object-cover mx-auto rounded"
    />
  </td>

  <td>{product.name}</td>

  <td>{product.category}</td>

  <td>₹{product.price}</td>

  <td>
    {product.offerPrice > 0
      ? `₹${product.offerPrice}`
      : "-"}
  </td>

  <td>{product.unit}</td>

  <td>
    <span
      className={
        product.status === "Available"
          ? "text-green-600 font-semibold"
          : "text-red-600 font-semibold"
      }
    >
      {product.status}
    </span>
  </td>

  <td>{product.stock}</td>

  <td>
    {isAdmin && (
  <button
    onClick={() => handleEdit(product)}
    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
  >
    Edit
  </button>
)}

   {isAdmin && (
  <button
    onClick={() =>
      handleDelete(product._id)
    }
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>
)}
  </td>
</tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;