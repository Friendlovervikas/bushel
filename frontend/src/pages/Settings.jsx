import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    websiteName: "Bushel",
    contactNumber: "+91 9580826129",
    supportEmail: "support@bushel.com",
    deliveryCharge: "50",
    razorpayKey: "",
    googleClientId: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8">
          Website Settings
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-semibold">
              Website Name
            </label>

            <input
              type="text"
              name="websiteName"
              value={settings.websiteName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Contact Number
            </label>

            <input
              type="text"
              name="contactNumber"
              value={settings.contactNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Support Email
            </label>

            <input
              type="email"
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Delivery Charge (₹)
            </label>

            <input
              type="number"
              name="deliveryCharge"
              value={settings.deliveryCharge}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Razorpay Key
            </label>

            <input
              type="text"
              name="razorpayKey"
              value={settings.razorpayKey}
              onChange={handleChange}
              placeholder="rzp_test_xxxxxxxxx"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Google Client ID
            </label>

            <input
              type="text"
              name="googleClientId"
              value={settings.googleClientId}
              onChange={handleChange}
              placeholder="Google OAuth Client ID"
              className="w-full border p-3 rounded-lg"
            />
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Change Admin Password
          </h2>

          <input
            type="password"
            name="adminPassword"
            value={settings.adminPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-8 py-3 rounded-lg mt-8"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;