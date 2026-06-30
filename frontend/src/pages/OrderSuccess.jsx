import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state || {};

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-2xl w-full">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order.
        </p>

        {/* Order Details */}

        <div className="bg-gray-100 rounded-xl p-6 mt-8 text-left">

          <h2 className="text-2xl font-bold text-center mb-6">
            Order Details
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Order ID :</strong>{" "}
              {order.orderId
                ? order.orderId.slice(-6).toUpperCase()
                : "N/A"}
            </p>

            <p>
              <strong>Payment Method :</strong>{" "}
              {order.paymentMethod || "N/A"}
            </p>

            <p>
              <strong>Total Amount :</strong> ₹
              {order.total || 0}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {order.status || "Pending"}
            </p>

          </div>

          {/* Purchase Summary */}

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Purchase Summary
            </h3>

            {/* Products */}

            {order.items &&
              order.items.length > 0 && (
                <>

                  <h4 className="font-semibold text-blue-600 mb-3">
                    Products
                  </h4>

                  {order.items.map((item) => (

                    <div
                      key={item._id || item.id}
                      className="flex justify-between border-b py-3"
                    >

                      <span>
                        {item.name} × {item.qty}
                      </span>

                      <span>
                        ₹{item.price * item.qty}
                      </span>

                    </div>

                  ))}

                </>
              )}

            {/* Membership */}

            {order.selectedPlan && (

              <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5">

                <h4 className="text-lg font-bold text-green-700 mb-3">
                  Membership Purchased
                </h4>

                <p>
                  <strong>Plan :</strong>{" "}
                  {order.selectedPlan.name}
                </p>

                <p>
                  <strong>Duration :</strong>{" "}
                  {order.selectedPlan.duration_days} Days
                </p>

                <p>
                  <strong>Price :</strong> ₹
                  {order.selectedPlan.price}
                </p>

              </div>

            )}

            {/* Empty */}

            {!order.selectedPlan &&
              (!order.items ||
                order.items.length === 0) && (

                <div className="text-center text-gray-500 mt-4">
                  No items found.
                </div>

            )}

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Go To Dashboard
          </Link>

          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;