import { useState } from "react";

function OtpLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  const sendOtp = () => {
    if (!mobile) {
      alert("Enter Mobile Number");
      return;
    }

    alert("OTP Sent Successfully");
    setShowOtpBox(true);
  };

  const verifyOtp = () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    alert("OTP Verified Successfully");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          OTP Login
        </h1>

        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Mobile Number
          </label>

          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={sendOtp}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Send OTP
        </button>

        {showOtpBox && (
          <div className="mt-6">

            <label className="block mb-2 font-medium">
              Enter OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
            >
              Verify OTP
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default OtpLogin;