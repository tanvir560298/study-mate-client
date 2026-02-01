import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const email = e.target.email.value;

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          Forgot Password?
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Success Message */}
          {message && (
            <p className="text-sm text-green-600 bg-green-50 border border-green-200 p-2 rounded-lg">
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
