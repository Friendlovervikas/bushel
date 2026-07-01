import { useState } from "react";

function Products() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Fresh Fruit Pack",
      price: 499,
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800",
      category: "Fruit",
    },
    {
      id: 2,
      name: "Juice Detox Pack",
      price: 299,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800",
      category: "Juice",
    },
    {
      id: 3,
      name: "Healthy Meal Box",
      price: 699,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      category: "Meal",
    },
    {
      id: 4,
      name: "Morning Energy Pack",
      price: 399,
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800",
      category: "Combo",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
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
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover hover:scale-105 transition duration-300"
            />

            {/* Content */}
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

              {/* Button */}
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;