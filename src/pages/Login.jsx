import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../store/authSlice";
import { toast } from "react-toastify";
import loginImage from "../assets/login.svg";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    userType: "resident",
  });

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
    try {
      const result = await dispatch(loginUser(formData));
      if (result.type === "auth/login/fulfilled") {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row relative">
      {/* Background image - only on large screens */}
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* Blur overlay - only on large screens */}
      <div className="hidden lg:block absolute inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/40"></div>

      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-light-green/80 to-medium-green/80 items-center justify-center p-6 relative z-10">
        <div className="max-w-sm">
          <div
            className="flex flex-column justify-content-center items-center  text-center"
            style={{ color: "white", flexDirection: "column" }}
          >
            <pre className="text-8xl font-bold mb-10">Welcome Back!</pre>

            <pre className="text-3xl leading-relaxed">
              Smart living. One dashboard.
            </pre>
          </div>
        </div>
      </div>
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 min-h-full px-6 lg:px-0">
        <div className="bg-white lg:bg-white/90 dark:bg-gray-800 lg:dark:bg-gray-800/90 lg:backdrop-blur-sm p-6 lg:p-10 rounded-lg shadow-sm w-full max-w-sm lg:max-w-md">
          <h2 className="text-2xl font-bold text-dark-blue mb-14 text-center">
            Login to RMS
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-teal text-sm font-bold mb-2">
                User Type
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              >
                <option value="resident">Resident</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-teal text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-teal text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 hover:bg-teal text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              style={{ color: "white" }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-medium-green hover:text-teal font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
