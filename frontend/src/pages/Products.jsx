
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
  addToCart(product);

  navigate("/cart");
};

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

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      {/* Header */}
      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold">
          Our Products
        </h1>

        <p className="text-gray-600 mt-2">
          Fresh, healthy and delivered daily
        </p>

      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover hover:scale-105 transition duration-300"
            />

            <div className="p-5">

              <span className="text-sm text-green-600 font-semibold">
                {product.category}
              </span>

              <h2 className="text-xl font-bold mt-1">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2">
                ₹{product.price}
              </p>

              <button
  onClick={() => handleAddToCart(product)}
  className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
>
  Add To Cart
</button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;

