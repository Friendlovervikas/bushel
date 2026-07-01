import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMySubscriptions } from "../services/subscriptionService";

function Cart() {
  const cartContext = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!cartContext) {
    return <div>Cart Context not available</div>;
  }

  const {
    cart = [],
    removeFromCart,
    increaseQty,
    decreaseQty,
    total = 0,
  } = cartContext;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Shopping Cart
      </h1>

      <div className="max-w-5xl mx-auto">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          cart.map((item) => {
            const itemId = item._id || item.id;

            return (
              <div
                key={itemId}
                className="bg-white p-6 rounded-xl shadow mb-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p>Price: ₹{item.price}</p>

                  <p>Quantity: {item.qty}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(itemId)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>

                    <button
                      onClick={() => increaseQty(itemId)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(itemId)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })
        )}

        <div className="bg-white p-6 rounded-xl shadow mt-8">
          <h2 className="text-2xl font-bold">Total: ₹{total}</h2>

          <button
  onClick={async () => {
    try {
      const subscriptions =
        await getMySubscriptions(user.token);

      const activeSubscription =
        subscriptions.find(
          (sub) => sub.status === "Active"
        );

      if (!activeSubscription) {
        alert(
          "You need an active subscription before purchasing products."
        );

        return navigate("/plans");
      }

      navigate("/checkout");
    } catch (error) {
      console.log(error);
      alert("Unable to verify subscription.");
    }
  }}
  className="inline-block mt-5 bg-green-600 text-white px-8 py-3 rounded-lg"
>
  Proceed To Checkout
</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;