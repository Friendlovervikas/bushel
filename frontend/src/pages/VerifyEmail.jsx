import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState(
    "Verifying your email..."
  );

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.get(
          `https://bushel-backend.onrender.com/api/auth/verify-email/${token}`
        );

        setSuccess(true);

        setMessage(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (error) {

        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
          "Verification failed."
        );

      } finally {

        setLoading(false);

      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">

        <div className="text-6xl mb-4">
          {loading ? "⏳" : success ? "✅" : "❌"}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Email Verification
        </h1>

        <p className="text-gray-600">
          {message}
        </p>

        {success && (
          <p className="mt-5 text-green-600 font-semibold">
            Redirecting to Login...
          </p>
        )}

      </div>

    </div>
  );
}

export default VerifyEmail;