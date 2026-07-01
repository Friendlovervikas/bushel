import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        `http://localhost:5001/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(data.message);

      navigate("/login");

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

            <span className="text-4xl">
              🔑
            </span>

          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-3">
            Create a strong new password to
            secure your Bushel account.
          </p>

        </div>

        <form
          onSubmit={submitHandler}
          className="mt-8"
        >

          <label className="block mb-2 font-semibold text-gray-700">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-4 rounded-xl"
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
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

export default ResetPassword;