import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
// import axios from "axios";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cart, total } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const selectedPlan =
  location.state?.selectedPlan || null;
  console.log("Location state:", location.state);
  console.log("Selected plan:", selectedPlan);

  // const [selectedPlan, setSelectedPlan] =
  //   useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    deliveryTime: "Morning",
  });

  // Auto-fill profile
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        mobile: user.phone || "",
        address: user.address || "",
        deliveryTime:
          user.deliveryTime || "Morning",
      });
    }
  }, [user]);

  // // Fetch selected plan
  // useEffect(() => {
  //   const fetchPlan = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://bushel-backend.onrender.com/api/plans/${planId}`
  //       );

  //       setSelectedPlan(data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (planId) {
  //     fetchPlan();
  //   }
  // }, [planId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Delivery Details
            </h2>

           <div className="space-y-4">

  <div className="border p-3 rounded-lg">
    <strong>Name</strong>
    <p>{formData.name}</p>
  </div>

  <div className="border p-3 rounded-lg">
    <strong>Mobile</strong>
    <p>{formData.mobile}</p>
  </div>

  <div className="border p-3 rounded-lg">
    <strong>Address</strong>
    <p>{formData.address}</p>
  </div>

  <div className="border p-3 rounded-lg">
    <strong>Delivery Time</strong>
    <p>{formData.deliveryTime}</p>
  </div>

  <Link
    to="/profile"
    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
  >
    Change Address
  </Link>

</div>

          </div>

          {/* RIGHT */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>
                        {selectedPlan && (
              <div className="mb-6 p-4 bg-green-50 border rounded-lg">

                <h3 className="text-xl font-bold text-green-700 mb-3">
                  Selected Membership
                </h3>

                <p>
                  <strong>Plan:</strong> {selectedPlan.name}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {selectedPlan.duration} Days
                </p>

                <p>
                  <strong>Price:</strong> ₹{selectedPlan.price}
                </p>

              </div>
            )}

            {cart.length === 0 ? (

              <p className="text-gray-500">
                No items in cart
              </p>

            ) : (

              cart.map((item) => (

                <div
                  key={item._id || item.id}
                  className="flex justify-between mb-3"
                >

                  <p>
                    {item.name} × {item.qty}
                  </p>

                  <p>
                    ₹{item.price * item.qty}
                  </p>

                </div>

              ))

            )}

            <hr className="my-4" />

            <div className="space-y-2 mb-6">

              <div className="flex justify-between">

                <span>Products Total</span>

                <span>₹{total}</span>

              </div>

              {selectedPlan && (

                <div className="flex justify-between">

                  <span>Membership Plan</span>

                  <span>
                    ₹{selectedPlan.price}
                  </span>

                </div>

              )}

            </div>

            <h3 className="text-2xl font-bold">

              Grand Total : ₹
              {total +
                (selectedPlan
                  ? selectedPlan.price
                  : 0)}

            </h3>

            {(cart.length > 0 || selectedPlan) ? (

  <Link
    to="/payment"
    state={{
      checkoutData: formData,
      selectedPlan,
    }}
    className="block text-center bg-green-600 text-white py-3 rounded-lg mt-8 hover:bg-green-700"
  >
    Continue To Payment
  </Link>

) : (

  <div className="mt-8">

    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-center mb-4">
      Your cart is empty.
    </div>

    <Link
      to="/products"
      className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
    >
      Continue Shopping
    </Link>

  </div>

)}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;