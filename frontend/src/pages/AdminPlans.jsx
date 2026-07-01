import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../services/planService";

function AdminPlans() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Fruit Pack",
    image: "",
    price: "",
    offerPrice: "",
    duration: "",
    deliveryTime: "Morning",
    features: "",
    status: "Active",
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error(error);
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
      const payload = {
        ...formData,
        price: Number(formData.price),
        offerPrice: Number(formData.offerPrice),
        duration: Number(formData.duration),
        features: formData.features
          .split(",")
          .map((item) => item.trim()),
      };

      if (editingId) {
        await updatePlan(
          editingId,
          payload,
          user.token
        );

        alert("Plan Updated");
      } else {
        await createPlan(
          payload,
          user.token
        );

        alert("Plan Added");
      }

      setEditingId(null);

      setFormData({
        name: "",
        description: "",
        category: "Fruit Pack",
        image: "",
        price: "",
        offerPrice: "",
        duration: "",
        deliveryTime: "Morning",
        features: "",
        status: "Active",
      });

      loadPlans();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  const handleEdit = (plan) => {
    setEditingId(plan._id);

    setFormData({
      name: plan.name,
      description: plan.description,
      category: plan.category,
      image: plan.image,
      price: plan.price,
      offerPrice: plan.offerPrice,
      duration: plan.duration,
      deliveryTime: plan.deliveryTime,
      features: plan.features.join(", "),
      status: plan.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) {
      return;
    }

    try {
      await deletePlan(id, user.token);

      alert("Plan Deleted");

      loadPlans();

    } catch (error) {

      console.error(error);

    }
  };
  return (
  <div className="min-h-screen bg-gray-100 p-8">

    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Membership Plan Management
      </h1>
{isAdmin && (

<div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Update Plan" : "Add New Plan"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Plan Name"
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

          <input
            type="number"
            name="duration"
            placeholder="Duration (Days)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="Fruit Pack">
              Fruit Pack
            </option>

            <option value="Juice">
              Juice
            </option>

            <option value="Combo">
              Combo
            </option>

          </select>

          <select
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Morning</option>
            <option>Evening</option>
            <option>Both</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Active</option>
            <option>Inactive</option>
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

          <textarea
            name="features"
            placeholder="Features (comma separated)"
            value={formData.features}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {editingId
            ? "Update Plan"
            : "Add Plan"}
        </button>

      </div>
)}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4">
                Image
              </th>

              <th>Name</th>

              <th>Category</th>

              <th>Price</th>

              <th>Offer</th>

              <th>Duration</th>

              <th>Delivery</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {plans.length > 0 ? (

              plans.map((plan) => (

                <tr
                  key={plan._id}
                  className="border-b text-center"
                >

                  <td className="p-3">

                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-20 h-20 object-cover mx-auto rounded-lg"
                    />

                  </td>

                  <td>{plan.name}</td>

                  <td>{plan.category}</td>

                  <td>₹{plan.price}</td>

                  <td>
                    {plan.offerPrice > 0
                      ? `₹${plan.offerPrice}`
                      : "-"}
                  </td>

                  <td>
                    {plan.duration} Days
                  </td>

                  <td>
                    {plan.deliveryTime}
                  </td>

                  <td>

                    <span
                      className={
                        plan.status === "Active"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {plan.status}
                    </span>

                  </td>

                  <td>

                    {isAdmin && (

<button
  onClick={() =>
    handleEdit(plan)
  }
  className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
>
  Edit
</button>

)}

                 {isAdmin && (

<button
  onClick={() =>
    handleDelete(plan._id)
  }
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Delete
</button>

)}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className="p-8 text-center text-gray-500"
                >
                  No Plans Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default AdminPlans;