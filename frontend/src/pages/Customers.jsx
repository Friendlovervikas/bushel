import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../services/adminService";

function Customers() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] =
  useState("All");

const [dateFilter, setDateFilter] =
  useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] =
  useState(null);

const [editForm, setEditForm] =
  useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryTime: "",
  });
  
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers(user.token);
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (customer) => {
  setEditCustomer(customer);

  setEditForm({
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    address: customer.address || "",
    deliveryTime:
      customer.deliveryTime || "",
  });
};

const handleDelete = async (id) => {

  if (
    !window.confirm(
      "Delete this customer?"
    )
  )
    return;

  try {

    await deleteCustomer(
      id,
      user.token
    );

    loadCustomers();

  } catch (error) {

    alert(
      error.response?.data?.message ||
        "Delete failed"
    );

  }

};

  const filteredCustomers = customers.filter(
  (customer) => {

    const matchesSearch =
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      customer.role === roleFilter;

    const matchesDate =
      !dateFilter ||
      new Date(customer.createdAt)
        .toISOString()
        .split("T")[0] === dateFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesDate
    );

  }
);
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Customers
      </h1>

      {/* Search */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search Name or Email..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border p-3 rounded-lg"
    />

    <select
      value={roleFilter}
      onChange={(e) =>
        setRoleFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    >
      <option value="All">
        All Roles
      </option>

      <option value="admin">
        Admin
      </option>

      <option value="user">
        User
      </option>

    </select>

    <input
      type="date"
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    />

  </div>

</div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr
                key={customer._id}
                className="border-b"
              >

                <td className="p-4">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.email}
                </td>

                <td className="p-4">
                  {customer.phone || "N/A"}
                </td>

                <td className="p-4 capitalize">
                  {customer.role}
                </td>

                <td className="p-4">

  <div className="flex gap-2 flex-wrap">

    <button
      onClick={() => setSelectedCustomer(customer)}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      View
    </button>

    {isAdmin && (
      <button
        onClick={() => handleEdit(customer)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    )}

    {isAdmin && (
      <button
        onClick={() => handleDelete(customer._id)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    )}

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Customer Details Modal */}

      {selectedCustomer && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-8 w-full max-w-lg">

            <h2 className="text-3xl font-bold mb-6">
              Customer Details
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Name:</strong>{" "}
                {selectedCustomer.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedCustomer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedCustomer.phone || "N/A"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {selectedCustomer.role}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {selectedCustomer.address || "Not Added"}
              </p>

              <p>
                <strong>Delivery Time:</strong>{" "}
                {selectedCustomer.deliveryTime || "Not Set"}
              </p>

            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      )}
      {editCustomer && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-8 w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-6">
        Edit Customer
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              name: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={editForm.email}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              email: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone"
          value={editForm.phone}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              phone: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Address"
          value={editForm.address}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              address: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Delivery Time"
          value={editForm.deliveryTime}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              deliveryTime: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={async () => {
            try {

              await updateCustomer(
                editCustomer._id,
                editForm,
                user.token
              );

              setEditCustomer(null);

              loadCustomers();

            } catch (error) {

              alert(
                error.response?.data?.message ||
                "Update failed"
              );

            }
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={() => setEditCustomer(null)}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
}

export default Customers;