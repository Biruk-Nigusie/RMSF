import { useState, useEffect } from "react";
import { residentsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react";

const AdminResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    block: "",
    ownershipType: "",
    status: "",
  });

  useEffect(() => {
    fetchResidents();
  }, [filters]);

  const fetchResidents = async () => {
    try {
      const response = await residentsAPI.getAll(filters);
      setResidents(response.data);
    } catch (error) {
      toast.error("Failed to fetch residents");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      try {
        await residentsAPI.delete(id);
        toast.success("Resident deleted successfully");
        fetchResidents();
      } catch (error) {
        toast.error("Failed to delete resident");
      }
    }
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue">
          Resident Management
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Block
            </label>
            <input
              type="text"
              name="block"
              value={filters.block}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              placeholder="Filter by block"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ownership Type
            </label>
            <select
              name="ownershipType"
              value={filters.ownershipType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
            >
              <option value="">All</option>
              <option value="OWNED">Owned</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Residents Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-light-green">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Block/House
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Ownership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Family Members
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
              {residents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {resident.fullName}
                    </div>
                    {resident.email && (
                      <div className="text-sm text-gray-500">
                        {resident.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Block {resident.block} - {resident.houseNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        resident.ownershipType === "OWNED"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {resident.ownershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.familyMembers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        resident.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {resident.status}
                    </span>
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
                        onClick={() => handleDelete(resident.id)}
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

      {/* Residents Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {residents.map((resident) => (
          <div key={resident.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  {resident.fullName}
                </h3>
                {resident.email && (
                  <p className="text-sm text-gray-500">{resident.email}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye size={16} />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(resident.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Phone:</span>
                <p className="font-medium">{resident.phone}</p>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <p className="font-medium">
                  Block {resident.block} - {resident.houseNo}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Family:</span>
                <p className="font-medium">{resident.familyMembers} members</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <div className="flex space-x-2 mt-1">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      resident.ownershipType === "OWNED"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {resident.ownershipType}
                  </span>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      resident.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {resident.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResidents;
