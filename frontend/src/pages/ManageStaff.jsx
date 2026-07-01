import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
} from "../services/staffService";

function ManageStaff() {

  const { user } = useAuth();

  const [staff, setStaff] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "subadmin",
    });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {

    try {

      setLoading(true);

      const data =
        await getAllStaff(
          user.token
        );

      setStaff(data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load staff."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "subadmin",
    });

  };
    const handleSubmit = async () => {

    try {

      if (editingId) {

        await updateStaff(
          editingId,
          formData,
          user.token
        );

        alert(
          "Staff updated successfully."
        );

      } else {

        await createStaff(
          formData,
          user.token
        );

        alert(
          "Staff created successfully."
        );

      }

      setShowForm(false);

      resetForm();

      loadStaff();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Operation failed."
      );

    }

  };

  const handleEdit = (item) => {

    setEditingId(item._id);

    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      password: "",
      role: item.role,
    });

    setShowForm(true);

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this staff member?"
      )
    )
      return;

    try {

      await deleteStaff(
        id,
        user.token
      );

      loadStaff();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed."
      );

    }

  };

  const handleStatus = async (id) => {

    try {

      await toggleStaffStatus(
        id,
        user.token
      );

      loadStaff();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Status update failed."
      );

    }

  };

  const filteredStaff =
    staff.filter((item) => {

      const matchesSearch =

        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.phone.includes(
          search
        );

      const matchesRole =

        roleFilter === "All"

        ||

        item.role === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );

    });

  if (loading) {

    return (

      <div className="p-10 text-center text-xl">

        Loading Staff...

      </div>

    );

  }
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Manage Staff
          </h1>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Staff
          </button>

        </div>

        {/* Add / Edit Form */}

        {showForm && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">

              {editingId
                ? "Edit Staff"
                : "Add Staff"}

            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              {!editingId && (

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

              )}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border rounded-lg p-3"
              >

               <option value="subadmin">
  Sub Admin
</option>

<option value="delivery">
  Delivery Boy
</option>

<option value="admin">
  Admin
</option>

              </select>

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >

                {editingId
                  ? "Update Staff"
                  : "Create Staff"}

              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        )}

        {/* Search & Filter */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search Staff..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >

              <option value="All">
  All Roles
</option>

<option value="admin">
  Admin
</option>

<option value="subadmin">
  Sub Admin
</option>

<option value="delivery">
  Delivery Boy
</option><option value="All">
  All Roles
</option>

<option value="admin">
  Admin
</option>

<option value="subadmin">
  Sub Admin
</option>

<option value="delivery">
  Delivery Boy
</option><option value="All">
  All Roles
</option>

<option value="admin">
  Admin
</option>

<option value="subadmin">
  Sub Admin
</option>

<option value="delivery">
  Delivery Boy
</option>

            </select>

          </div>

        </div>
                {/* Staff Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStaff.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No staff found.
                  </td>

                </tr>

              ) : (

                filteredStaff.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.email}
                    </td>

                    <td className="p-4">
                      {item.phone}
                    </td>

                    <td className="p-4 capitalize">
                      {item.role}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleStatus(item._id)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          {item.isActive
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default ManageStaff;