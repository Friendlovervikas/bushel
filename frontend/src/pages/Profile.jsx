import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/userService";
import axios from "axios";

function Profile() {

  const {
    user,
    updateUser,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      deliveryTime:
        user?.deliveryTime ||
        "Morning",
    });

  const [
    passwordData,
    setPasswordData,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [
    editing,
    setEditing,
  ] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSave =
    async () => {

      if (
        !formData.name ||
        !formData.phone ||
        !formData.address
      ) {

        alert(
          "Please fill all required fields."
        );

        return;

      }

      try {

        const updatedUser =
          await updateProfile(
            formData,
            user.token
          );

        updateUser(updatedUser);

        alert(
          "Profile updated successfully."
        );

        setEditing(false);

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Profile update failed"
        );

      }

    };

  const handlePasswordChange =
    async () => {

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        alert(
          "New passwords do not match."
        );

        return;

      }

      try {

        await axios.put(
          "http://localhost:5001/api/users/change-password",
          passwordData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        alert(
          "Password updated successfully"
        );

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Password update failed"
        );

      }

    };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
                    <div>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border p-3 rounded-lg"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Mobile Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editing}
              maxLength={10}
              className="w-full border p-3 rounded-lg"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              rows="3"
              className="w-full border p-3 rounded-lg"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Delivery Time
            </label>

            <select
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border p-3 rounded-lg"
            >

              <option value="Morning">
                Morning
              </option>

              <option value="Evening">
                Evening
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Role
            </label>

            <input
              type="text"
              value={user?.role || "user"}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          {!editing ? (

            <button
              onClick={() =>
                setEditing(true)
              }
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>

          ) : (

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Save Profile
            </button>

          )}

        </div>

      </div>

      {/* Change Password */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 mt-8">

        <h2 className="text-3xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handlePasswordChange}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;