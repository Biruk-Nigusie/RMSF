import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { condominiumAPI } from "../services/api";
import { toast } from "react-toastify";
import signupImage from "../assets/signup.svg";
import bgImage from "../assets/bg.jpg";

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

      {/* Left side - Text */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-light-green/80 to-medium-green/80 items-center justify-center p-6 relative z-10">
        <div className="max-w-sm">
          <div
            className="flex flex-column justify-content-center items-center  text-center"
            style={{ color: "white", flexDirection: "column" }}
          >
            <pre className="text-8xl font-bold mb-4">Join RMS Today!</pre>

            <pre className="text-3xl leading-relaxed">
              Start your journey with us.
            </pre>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 px-6 lg:px-0">
        <div className="bg-white lg:bg-white/90 dark:bg-gray-800 lg:dark:bg-gray-800/90 lg:backdrop-blur-sm p-6 lg:p-14 rounded-lg shadow-sm w-full max-w-lg lg:max-w-2xl">
          <h2 className="text-2xl font-bold text-dark-blue mb-16 text-center">
            Register for RMS
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                />
              </div>
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Block
                </label>
                <input
                  type="text"
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  House Number
                </label>
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Ownership Type
                </label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="OWNED">Owned</option>
                  <option value="RENTED">Rented</option>
                </select>
              </div>
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Family Members
                </label>
                <input
                  type="number"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Owner Name (if rented)
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                />
              </div>
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Car Plate (Optional)
                </label>
                <input
                  type="text"
                  name="carPlate"
                  value={formData.carPlate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-teal text-sm font-bold mb-1">
                Condominium
              </label>
              {loadingCondominiums ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  Loading condominiums...
                </div>
              ) : (
                <select
                  name="condominiumId"
                  value={formData.condominiumId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
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
              <div>
                <label className="block text-teal text-sm font-bold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-900 w-full bg-medium-green hover:bg-teal text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mt-5"
            style={{color:"white",cursor:"pointer"}}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-medium-green hover:text-teal font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
