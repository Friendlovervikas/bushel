import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return alert("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          phone,
          email,
          password,
        }
      );

      login(data);

      alert("Account Created Successfully");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };
  const googleSignup = useGoogleLogin({
  flow: "implicit",

  onSuccess: async (tokenResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/google-login",
        {
          accessToken: tokenResponse.access_token,
        }
      );

      login(data);

      alert("Google Sign Up Successful");

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Google Sign Up Failed"
      );

    }
  },

  onError: () => {
    alert("Google Sign Up Failed");
  },
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-6">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-6">

        <div className="text-center mb-4">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">

            <span className="text-3xl">
              🥗
            </span>

          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Create Account
          </h1>

        </div>

<form onSubmit={submitHandler} className="space-y-4">

  {/* Full Name */}
  <div>
    <label className="text-sm font-semibold text-gray-700">
      Full Name
    </label>

    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>

  {/* Email + Mobile */}
  <div className="grid grid-cols-2 gap-3">

    <div>
      <label className="text-sm font-semibold text-gray-700">
        Email Address
      </label>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <div>
  <label className="text-sm font-semibold text-gray-700">
    Mobile Number
  </label>

  <input
    type="tel"
    placeholder="Mobile Number"
    value={phone}
    onChange={(e) =>
      setPhone(
        e.target.value.replace(/\D/g, "").slice(0, 10)
      )
    }
    maxLength={10}
    className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
  />
</div>

  </div>

  {/* Password + Confirm Password */}
  <div className="grid grid-cols-2 gap-3">

    <div>
      <label className="text-sm font-semibold text-gray-700">
        Password
      </label>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <div>
      <label className="text-sm font-semibold text-gray-700">
        Confirm Password
      </label>

      <input
        type="password"
        placeholder="Confirm"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
  >
    {loading
      ? "Creating..."
      : "Create Account"}
  </button>

</form>

    

        <button
  type="button"
  onClick={() => googleSignup()}
  className="w-full border mt-2 border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
>
  <FcGoogle size={22} />
  Continue with Google
</button>

        <div className="text-center mt-4 text-sm text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;