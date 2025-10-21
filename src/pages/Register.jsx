import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { condominiumAPI } from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    block: "",
    houseNo: "",
    ownershipType: "OWNED",
    ownerName: "",
    familyMembers: 1,
    carPlate: "",
    password: "",
    confirmPassword: "",
    condominiumId: "",
  });
  const [condominiums, setCondominiums] = useState([]);
  const [loadingCondominiums, setLoadingCondominiums] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCondominiums();
  }, []);

  const fetchCondominiums = async () => {
    try {
      const response = await condominiumAPI.getAll();
      setCondominiums(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch condominiums:", error);
      toast.error("Failed to load condominiums");
    } finally {
      setLoadingCondominiums(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log("Submitting registration form:", formData);

    try {
      const result = await dispatch(registerUser(formData));
      console.log("Registration result:", result);

      if (result.type === "auth/register/fulfilled") {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else if (result.type === "auth/register/rejected") {
        console.error("Registration rejected:", result.payload);
        toast.error(result.payload || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      {/* Main Container */}

      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[800px]">
          {/* Left Side - Welcome Section */}
          <div
            className="lg:w-2/5 bg-blue-900 text-white p-8 lg:p-10 flex flex-col justify-center"
            style={{ color: "white" }}
          >
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center bg-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  EthioRMS
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Join EthioRMS Today!
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Start your journey with us.
                  <br />
                  Manage your condominium life seamlessly.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Easy Rent & Utility Payments
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">
                    Maintenance Request Tracking
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">Community Announcements</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-900 font-bold">✓</span>
                  </div>
                  <span className="text-blue-100">24/7 Amharic Support</span>
                </div>
              </div>

              {/* Already have account for mobile */}
              <div className="mt-8 lg:hidden text-center">
                <p className="text-blue-200">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-300 hover:text-blue-200 font-semibold underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-3/5 p-6 lg:p-8 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of residents managing their homes with EthioRMS
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

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Condominium *
                    </label>
                    {loadingCondominiums ? (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500">
                        Loading condominiums...
                      </div>
                    ) : (
                      <select
                        name="condominiumId"
                        value={formData.condominiumId}
                        onChange={handleChange}
                        className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Select Condominium</option>
                        {condominiums.map((condo) => (
                          <option key={condo.id} value={condo.id}>
                            {condo.name} - {condo.location}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Housing Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Block *
                    </label>
                    <input
                      type="text"
                      name="block"
                      value={formData.block}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Block A"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      House Number *
                    </label>
                    <input
                      type="text"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="101"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Family Members *
                    </label>
                    <input
                      type="number"
                      name="familyMembers"
                      value={formData.familyMembers}
                      onChange={handleChange}
                      min="1"
                      max="20"
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ownership Type *
                    </label>
                    <select
                      name="ownershipType"
                      value={formData.ownershipType}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="OWNED">Owned</option>
                      <option value="RENTED">Rented</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Car Plate (Optional)
                    </label>
                    <input
                      type="text"
                      name="carPlate"
                      value={formData.carPlate}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="3-AAB-123"
                    />
                  </div>
                </div>

                {formData.ownershipType === "RENTED" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter owner's full name"
                      required={formData.ownershipType === "RENTED"}
                    />
                  </div>
                )}

                {/* Password Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-900 font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform mt-6 cursor-pointer"
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
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Login here
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

export default Register;
