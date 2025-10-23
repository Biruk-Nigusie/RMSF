import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../store/authSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../assets/login.svg";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    userType: "resident",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate Ethiopian phone number format (9 digits: 900000000)
    const phoneRegex = /^[79]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number. Must be 9 digits starting with 7 or 9");
      return;
    }
    const fullPhone = `+251${formData.phone}`;
    
    try {
      const result = await dispatch(loginUser({...formData, phone: fullPhone}));
      if (result.type === "auth/login/fulfilled") {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-50 p-2">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Welcome Section */}
          <div
            className="lg:w-1/2 bg-blue-900 text-white p-4 lg:p-12 flex flex-col justify-center"
            style={{ color: "white" }}
          >
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center bg-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  EthioRMS
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Welcome Back!
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Smart living. One dashboard.
                  <br />
                  Manage your Ethiopian property seamlessly.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 00 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Local Payment Integration
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 00 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">Amharic Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 00 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">24/7 Customer Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Login to EthioRMS
                </h2>
                <p className="text-gray-600">
                  Access your residential management dashboard
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="resident">Resident</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">+251</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="9XX XXX XXX"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  style={{ color: "white" }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : (
                    "Login to Dashboard"
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
