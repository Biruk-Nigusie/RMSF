import { useState, useEffect } from "react";
import { complaintsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { Eye, Edit, CheckCircle } from "lucide-react";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintsAPI.getAll();
      console.log("Admin complaints response:", response);
      setComplaints(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (id, status) => {
    try {
      await complaintsAPI.update(id, { status });
      toast.success("Complaint status updated");
      fetchComplaints();
    } catch (error) {
      toast.error("Failed to update complaint");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "MAINTENANCE":
        return "bg-blue-100 text-blue-800";
      case "SECURITY":
        return "bg-red-100 text-red-800";
      case "WATER":
        return "bg-cyan-100 text-cyan-800";
      case "ELECTRICITY":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          Complaint Management
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Total</h3>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {Array.isArray(complaints) ? complaints.length : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Open</h3>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {Array.isArray(complaints)
              ? complaints.filter((c) => c.status === "OPEN").length
              : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">
            In Progress
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">
            {Array.isArray(complaints)
              ? complaints.filter((c) => c.status === "IN_PROGRESS").length
              : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">
            Resolved
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {Array.isArray(complaints)
              ? complaints.filter((c) => c.status === "RESOLVED").length
              : 0}
          </p>
        </div>
      </div>

      {/* Complaints Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-light-green">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Resident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(complaints) &&
                complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {complaint.resident?.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Block {complaint.resident?.block}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {complaint.resident?.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {complaint.resident?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                          complaint.category
                        )}`}
                      >
                        {complaint.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {complaint.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </button>
                        {complaint.status !== "RESOLVED" && (
                          <button
                            onClick={() =>
                              updateComplaintStatus(complaint.id, "RESOLVED")
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaints Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {Array.isArray(complaints) &&
          complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {complaint.resident?.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Block {complaint.resident?.block}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  {complaint.status !== "RESOLVED" && (
                    <button
                      onClick={() =>
                        updateComplaintStatus(complaint.id, "RESOLVED")
                      }
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-900">{complaint.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                    complaint.category
                  )}`}
                >
                  {complaint.category}
                </span>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    complaint.status
                  )}`}
                >
                  {complaint.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <p>Phone: {complaint.resident?.phone}</p>
                <p>
                  Date: {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminComplaints;
