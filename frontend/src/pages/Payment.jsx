import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import {
  createSubscription,
  renewSubscription,
  getMySubscriptions,
} from "../services/subscriptionService";
function Payment() {
  const [method, setMethod] = useState("upi");

  const navigate = useNavigate();
  const location = useLocation();

  const { total, cart, clearCart } = useCart();
  console.log("========== PAYMENT ==========");
console.log("Cart:", cart);
console.log("Total:", total);
console.log("Location State:", location.state);
console.log("=============================");
  const { user } = useAuth();

  const checkoutData =
    location.state?.checkoutData || {};

  const selectedPlan =
  location.state?.selectedPlan || null;

  const isRenewal =
  location.state?.isRenewal || false;

const subscriptionId =
  location.state?.subscriptionId || null;

  const handlePayment = async () => {
    if (cart.length === 0 && !selectedPlan) {
  return alert("Cart is empty");
}
    try {
      const orderData = {
        userId: user._id,

        products:
  cart.length > 0
    ? cart.map((item) => ({
        productId: item._id,
        quantity: item.qty,
      }))
    : [],
        totalAmount:
  total +
  (selectedPlan ? selectedPlan.price : 0),

        deliveryAddress:
          checkoutData.address,

        deliveryTime:
          checkoutData.deliveryTime,

        customerName:
          checkoutData.name,

        customerMobile:
          checkoutData.mobile,
      };

      const savedOrder = await createOrder(
        orderData,
        user.token
      );
 if (selectedPlan) {

  if (isRenewal) {

    await renewSubscription(
      subscriptionId,
      user.token
    );

  } else {

    await createSubscription(
      {
        planId: selectedPlan._id,
        paymentId: null,

        deliveryAddress:
          checkoutData.address,

        deliveryTime:
          checkoutData.deliveryTime,

        autoRenew: false,

        notes: "",
      },
      user.token
    );

  }

}
      console.log(
        "Saved Order:",
        savedOrder
      );

      alert(
        `Payment successful using ${method}`
      );

      navigate("/order-success", {
        state: {
          orderId: savedOrder._id,
          paymentMethod: method,
          total: savedOrder.totalAmount,
          status: savedOrder.status,
          items: cart,
          checkoutData,
          selectedPlan,
        },
      });

      clearCart();

  } catch (error) {

  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("FULL ERROR:", error);

  alert(
    error.response?.data?.message ||
    "Order creation failed"
  );

}
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Payment Options
        </h1>

        <div className="mb-6 text-center">

          <h2 className="text-xl font-semibold">
  Total Amount: ₹
  {total + (selectedPlan ? selectedPlan.price : 0)}
</h2>
        </div>

        <div className="space-y-4">

          <label className="flex items-center gap-3 border p-4 rounded-lg">

            <input
              type="radio"
              value="upi"
              checked={method === "upi"}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />

            UPI (Google Pay / PhonePe)

          </label>

          <label className="flex items-center gap-3 border p-4 rounded-lg">

            <input
              type="radio"
              value="card"
              checked={method === "card"}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />

            Debit / Credit Card

          </label>

          <label className="flex items-center gap-3 border p-4 rounded-lg">

            <input
              type="radio"
              value="cod"
              checked={method === "cod"}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            />

            Cash on Delivery

          </label>

        </div>

        <div className="mt-8 flex gap-4">

          <Link
            to="/checkout"
            className="flex-1 text-center border py-3 rounded-lg"
          >
            Back
          </Link>

          <button
            onClick={handlePayment}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg"
          >
            Pay Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;