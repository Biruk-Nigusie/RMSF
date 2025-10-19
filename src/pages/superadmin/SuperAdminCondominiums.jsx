import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, Eye, Building, Users, MapPin } from "lucide-react";

const SuperAdminCondominiums = () => {
  const [condominiums, setCondominiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    totalUnits: "",
    totalBlocks: "",
    amenities: "",
    description: "",
  });

  useEffect(() => {
    fetchCondominiums();
  }, []);

  const fetchCondominiums = async () => {
    try {
      // Mock data for now
      setCondominiums([
        {
          id: 1,
          name: "Sunset Heights",
          address: "123 Sunset Boulevard, City Center",
          totalUnits: 150,
          totalBlocks: 5,
          totalResidents: 420,
          totalAdmins: 3,
          amenities: "Swimming Pool, Gym, Parking, Security",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Ocean View",
          address: "456 Ocean Drive, Beachfront",
          totalUnits: 200,
          totalBlocks: 8,
          totalResidents: 580,
          totalAdmins: 4,
          amenities: "Beach Access, Pool, Tennis Court, Spa",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Garden Plaza",
          address: "789 Garden Street, Downtown",
          totalUnits: 100,
          totalBlocks: 3,
          totalResidents: 280,
          totalAdmins: 2,
          amenities: "Garden, Playground, Community Hall",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      toast.error("Failed to fetch condominiums");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API call
      toast.success("Condominium created successfully");
      setShowForm(false);
      setFormData({
        name: "",
        address: "",
        totalUnits: "",
        totalBlocks: "",
        amenities: "",
        description: "",
      });
      fetchCondominiums();
    } catch (error) {
      toast.error("Failed to create condominium");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this condominium?")) {
      try {
        // Mock API call
        toast.success("Condominium deleted successfully");
        fetchCondominiums();
      } catch (error) {
        toast.error("Failed to delete condominium");
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
        <h1 className="text-3xl font-bold text-dark-blue">
          Condominium Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Condominium</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-teal">Total Properties</h3>
          <p className="text-2xl font-bold text-dark-blue">
            {condominiums.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-teal">Total Units</h3>
          <p className="text-2xl font-bold text-dark-blue">
            {condominiums.reduce((sum, condo) => sum + condo.totalUnits, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-teal">Total Residents</h3>
          <p className="text-2xl font-bold text-dark-blue">
            {condominiums.reduce((sum, condo) => sum + condo.totalResidents, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-teal">Total Admins</h3>
          <p className="text-2xl font-bold text-dark-blue">
            {condominiums.reduce((sum, condo) => sum + condo.totalAdmins, 0)}
          </p>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            Add New Condominium
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Units
                </label>
                <input
                  type="number"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Blocks
                </label>
                <input
                  type="number"
                  name="totalBlocks"
                  value={formData.totalBlocks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Swimming Pool, Gym, Parking, etc."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Brief description of the condominium..."
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create Condominium
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

      {/* Condominiums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {condominiums.map((condo) => (
          <div key={condo.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-medium-green text-white rounded-full p-2">
                  <Building size={20} />
                </div>
                <h3 className="text-xl font-semibold text-dark-blue">
                  {condo.name}
                </h3>
              </div>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  condo.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {condo.status}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <MapPin size={16} />
              <span className="text-sm">{condo.address}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-dark-blue">
                  {condo.totalUnits}
                </p>
                <p className="text-sm text-gray-600">Units</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-dark-blue">
                  {condo.totalBlocks}
                </p>
                <p className="text-sm text-gray-600">Blocks</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users size={16} className="text-teal" />
                  <span className="text-lg font-semibold text-dark-blue">
                    {condo.totalResidents}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Residents</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users size={16} className="text-medium-green" />
                  <span className="text-lg font-semibold text-dark-blue">
                    {condo.totalAdmins}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Admins</p>
              </div>
            </div>

            {condo.amenities && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Amenities:
                </p>
                <p className="text-sm text-gray-600">{condo.amenities}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">
                Created {new Date(condo.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye size={16} />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(condo.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminCondominiums;
