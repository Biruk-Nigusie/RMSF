import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Eye, EyeOff } from "lucide-react";
import { condominiumAPI } from "../../services/api";
import api from "../../services/api";

const CreateCondominiumAdmin = () => {
  const [condominiums, setCondominiums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    condominiumId: "",
    password: "",
  });

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
    
    const phoneRegex = /^[79]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number. Must be 9 digits starting with 7 or 9");
      return;
    }

    setLoading(true);
    try {
      const selectedCondominium = condominiums.find(c => c.id === formData.condominiumId);
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `+251${formData.phone}`,
        assignedCondominium: selectedCondominium?.name || "",
        password: formData.password,
        role: "ADMIN"
      };

      await api.post("/admins", payload);
      toast.success("Condominium admin created successfully");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        condominiumId: "",
        password: "",
      });
    } catch (error) {
      console.error("Failed to create admin:", error);
      toast.error(error.response?.data?.error || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-2">
          Create Condominium Admin
        </h1>
        <p className="text-teal">Assign administrators to manage condominiums</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              placeholder="Enter admin's full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  placeholder="9XX XXX XXX"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Condominium *
            </label>
            <select
              name="condominiumId"
              value={formData.condominiumId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              required
            >
              <option value="">Select Condominium</option>
              {condominiums.map((condo) => (
                <option key={condo.id} value={condo.id}>
                  {condo.name} - {condo.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Create a secure password"
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

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-medium-green hover:bg-teal text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
              <span>{loading ? "Creating..." : "Create Admin"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Condominium List */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-teal mb-4">Available Condominiums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {condominiums.map((condo) => (
            <div key={condo.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-dark-blue">{condo.name}</h3>
              <p className="text-sm text-gray-600">{condo.location}</p>
              <p className="text-sm text-gray-500 mt-2">
                {condo.totalBlocks} blocks • {condo.totalResidents || 0} residents
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCondominiumAdmin;