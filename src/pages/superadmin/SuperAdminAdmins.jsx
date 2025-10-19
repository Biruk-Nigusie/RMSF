import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, Eye, Shield } from "lucide-react";

const SuperAdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    condominiumId: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      // Mock data for now
      setAdmins([
        {
          id: 1,
          firstName: "John",
          lastName: "Smith",
          email: "john.admin@example.com",
          phone: "+1234567890",
          condominium: { name: "Sunset Heights" },
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah.admin@example.com",
          phone: "+1234567891",
          condominium: { name: "Ocean View" },
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API call
      toast.success("Admin created successfully");
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        condominiumId: "",
      });
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to create admin");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        // Mock API call
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } catch (error) {
        toast.error("Failed to delete admin");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-blue">Admin Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Admin</span>
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            Create New Admin
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condominium
              </label>
              <select
                name="condominiumId"
                value={formData.condominiumId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              >
                <option value="">Select Condominium</option>
                <option value="1">Sunset Heights</option>
                <option value="2">Ocean View</option>
                <option value="3">Garden Plaza</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create Admin
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-light-green">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Condominium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="bg-medium-green text-white rounded-full p-2">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {admin.firstName} {admin.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.email}</div>
                    <div className="text-sm text-gray-500">{admin.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.condominium?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAdmins;
