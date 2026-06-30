function Cart() {
const cartItems = [
{
id: 1,
name: "Fresh Fruit Pack",
price: 499,
quantity: 1,
image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800"
},
{
id: 2,
name: "Juice Detox Pack",
price: 299,
quantity: 2,
image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800"
}
];

const total = cartItems.reduce(
(sum, item) => sum + item.price * item.quantity,
0
);

return ( <div className="min-h-screen bg-gray-50 py-12">

```
  <div className="max-w-5xl mx-auto px-6">

    <h1 className="text-4xl font-bold mb-10">
      Shopping Cart
    </h1>

    <div className="space-y-6">

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-5 flex items-center justify-between shadow"
        >
          <div className="flex items-center gap-5">

            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>
              <h3 className="text-xl font-bold">
                {item.name}
              </h3>

              <p className="text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

          </div>

          <h3 className="text-2xl font-bold text-green-600">
            ₹{item.price}
          </h3>

        </div>
      ))}

    </div>

    <div className="bg-white mt-8 rounded-2xl p-6 shadow">

      <div className="flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span className="text-green-600">₹{total}</span>
      </div>

      <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
        Proceed To Checkout
      </button>

    </div>

  </div>

</div>


);
}

export default Cart;
