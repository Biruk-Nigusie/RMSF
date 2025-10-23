import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, Shield, Eye, EyeOff } from "lucide-react";
import { condominiumAPI } from "../../services/api";
import api from "../../services/api";

const SuperAdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [condominiums, setCondominiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assignedCondominium: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchCondominiums();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get('/admins');
      setAdmins(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const fetchCondominiums = async () => {
    try {
      const response = await condominiumAPI.getAll();
      setCondominiums(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch condominiums:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneRegex = /^[79]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number. Must be 9 digits starting with 7 or 9");
      return;
    }
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `+251${formData.phone}`,
        assignedCondominium: formData.assignedCondominium,
        password: formData.password || 'admin123',
        role: 'ADMIN'
      };
      
      if (editingId) {
        await api.put(`/admins/${editingId}`, payload);
        toast.success("Admin updated successfully");
      } else {
        await api.post('/admins', payload);
        toast.success("Admin created successfully");
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        assignedCondominium: "",
        password: "",
      });
      fetchAdmins();
    } catch (error) {
      console.error('Failed to save admin:', error);
      toast.error(error.response?.data?.error || "Failed to save admin");
    }
  };

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone.replace('+251', ''),
      assignedCondominium: admin.assignedCondominium || '',
      password: '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      try {
        await api.delete(`/admins/${id}`);
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } catch (error) {
        console.error('Failed to delete admin:', error);
        toast.error(error.response?.data?.error || "Failed to delete admin");
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
            {editingId ? 'Edit Admin' : 'Create New Admin'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+251</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-16 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                    placeholder="9XX XXX XXX"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Condominium
                </label>
                <select
                  name="assignedCondominium"
                  value={formData.assignedCondominium}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="">Select Condominium</option>
                  {condominiums.map((condo) => (
                    <option key={condo.id} value={condo.name}>
                      {condo.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password {editingId && '(leave blank to keep current)'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                    required={!editingId}
                    placeholder={editingId ? "Leave blank to keep current" : "Enter password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                {editingId ? 'Update Admin' : 'Create Admin'}
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
                          {admin.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {admin.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.email}</div>
                    <div className="text-sm text-gray-500">{admin.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.assignedCondominium || 'Not Assigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(admin)}
                        className="text-green-600 hover:text-green-900"
                      >
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
