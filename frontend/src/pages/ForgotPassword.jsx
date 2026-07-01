import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://bushel-backend.onrender.com/api/auth/forgot-password",
        { email }
      );

      alert(data.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center">

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">

            <span className="text-4xl">🔐</span>

          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Password?
          </h1>

          <p className="text-gray-500 mt-3">
            Don't worry! Enter your registered email
            address and we'll send you a password
            reset link.
          </p>

        </div>

        <form
          onSubmit={submitHandler}
          className="mt-8"
        >

          <label className="block mb-2 font-semibold text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-4 rounded-xl"
          >
            {loading
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="text-green-600 hover:underline font-medium"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;