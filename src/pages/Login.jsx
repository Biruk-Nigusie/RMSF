import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../store/authSlice";
import { toast } from "react-toastify";

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
    <div className="flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-dark-blue mb-6 text-center">
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
            className="w-full bg-medium-green hover:bg-teal text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-medium-green hover:text-teal">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
