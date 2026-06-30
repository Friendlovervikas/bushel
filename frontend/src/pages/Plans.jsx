import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Plans() {
const [plans, setPlans] = useState([]);

useEffect(() => {
axios
.get("http://localhost:5001/api/plans")
.then((res) => {
setPlans(res.data);
})
.catch((err) => {
console.log(err);
});
}, []);

return ( <div className="min-h-screen bg-green-50 p-10">


  <h1 className="text-5xl font-bold text-center mb-12">
    Choose Your Membership
  </h1>

  <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

    {plans.map((plan) => (
      <div
        key={plan._id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >

        <img
          src={plan.image_url}
          alt={plan.name}
          className="w-full h-56 object-cover"
        />

        <div className="p-8">

          <h2 className="text-3xl font-bold">
            {plan.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {plan.description}
          </p>

          <p className="text-green-600 text-2xl font-bold mt-4">
            ₹{plan.price}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {plan.duration_days} Days
          </p>

          <ul className="mt-6 space-y-2">

            {plan.features.map((item, index) => (
              <li key={index}>
                ✓ {item}
              </li>
            ))}

          </ul>

          <Link
  to="/checkout"
  state={{
    selectedPlan: plan,
  }}
  className="block text-center mt-8 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
  Select Plan
</Link>

        </div>

      </div>
    ))}

  </div>

</div>


);
}

export default Plans;
