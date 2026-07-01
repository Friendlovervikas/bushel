import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://bushel-backend.onrender.com/api/auth/login",
        {
          email: loginId,
          password,
        }
      );
      console.log("LOGIN RESPONSE:", data);

      login(data);
      console.log("ROLE:", data.role);

      alert("Login Successful");

      if (
  data.role === "admin" ||
  data.role === "subadmin"
) {

  navigate("/admin");

} else if (
  data.role === "delivery"
) {

  navigate("/delivery");

} else {

  navigate("/dashboard");

}
    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };
  const googleSuccess = async (credentialResponse) => {
  try {
    const { data } = await axios.post(
      "https://bushel-backend.onrender.com/api/auth/google-login",
      {
        credential: credentialResponse.credential,
      }
    );

    login(data);

    alert("Google Login Successful");

   if (
  data.role === "admin" ||
  data.role === "subadmin"
) {

  navigate("/admin");

} else if (
  data.role === "delivery"
) {

  navigate("/delivery");

} else {

  navigate("/dashboard");

}

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Google Login Failed"
    );

  }
};
const googleLogin = useGoogleLogin({
  flow: "implicit",

  onSuccess: async (tokenResponse) => {
    try {
      const { data } = await axios.post(
        "https://bushel-backend.onrender.com/api/auth/google-login",
        {
          accessToken: tokenResponse.access_token,
        }
      );

      login(data);

      alert("Google Login Successful");

     if (
  data.role === "admin" ||
  data.role === "subadmin"
) {

  navigate("/admin");

} else if (
  data.role === "delivery"
) {

  navigate("/delivery");

} else {

  navigate("/dashboard");

}
    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Google Login Failed"
      );

    }
  },

  onError: () => {
    alert("Google Login Failed");
  },
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

        <div className="text-center">

          <div className="w-15 h-15 rounded-full bg-green-100 flex items-center justify-center mx-auto ">

            <span className="text-4xl">
              🥬
            </span>

          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          {/* <p className="text-gray-500 mt-2">
            Sign in to continue to Bushel
          </p> */}

        </div>

        <form
          onSubmit={submitHandler}
          className="mt-2"
        >

          <label className="block font-semibold text-gray-700 mb-2">
            Email or Mobile Number
          </label>

 <input
  type="text"
  placeholder="Email or Mobile Number"
  value={loginId}
  onChange={(e) => setLoginId(e.target.value)}
  required
  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
/>
          <label className="block font-semibold text-gray-700 mt-2 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-end mt-2">

            <Link
              to="/forgot-password"
              className="text-green-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-4 rounded-xl mt-2"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        {/* <div className="flex items-center my-6">

          {/* <div className="flex-1 h-px bg-gray-300"></div> */}

          {/* <span className="px-4 text-gray-500 text-sm">
            OR
          </span> */}

          

        

        <button  onClick={() => googleLogin()} 
        className="w-full border my-4 border-gray-300 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">

          <FcGoogle size={24} />

          Continue with Google

        </button>

        <div className="text-center mt-2">

          <Link
            to="/otp-login"
            className="text-green-600 font-medium hover:underline"
          >
            Login with OTP
          </Link>

        </div>

        <div className="text-center mt-2 text-gray-600">

          Don't have an account?

          <Link
            to="/signup"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;