import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { parkingAPI } from "../../services/api";
import {
  Car,
  Plus,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  FileText,
  Trash2,
  CircleParking,
  CarFront,
} from "lucide-react";

const AdminParking = () => {
  const [parkingRequests, setParkingRequests] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddSlots, setShowAddSlots] = useState(false);
  const [newSlotsCount, setNewSlotsCount] = useState(10);
  const [telebirrPhone, setTelebirrPhone] = useState("");
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [slotPrice, setSlotPrice] = useState(500);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDocument, setShowDocument] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");
  const [approvalAction, setApprovalAction] = useState("");
  const [gridSize, setGridSize] = useState({ rows: 5, cols: 8 });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSlotActions, setShowSlotActions] = useState(false);

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      const [requestsResponse, slotsResponse] = await Promise.all([
        parkingAPI.getAllRequests(),
        parkingAPI.getSlots(),
      ]);

      setParkingRequests(
        requestsResponse.data?.data || requestsResponse.data || []
      );
      setParkingSlots(slotsResponse.data?.data || slotsResponse.data || []);
    } catch (error) {
      console.error("Failed to fetch parking data:", error);
      toast.error("Failed to fetch parking data");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (request) => {
    if (
      window.confirm("Are you sure you want to approve this parking request?")
    ) {
      setSelectedRequest(request);
      setApprovalAction("approve");
      setShowApprovalModal(true);
    }
  };

  const handleRejectRequest = async (request) => {
    if (
      window.confirm("Are you sure you want to reject this parking request?")
    ) {
      setSelectedRequest(request);
      setApprovalAction("reject");
      setShowApprovalModal(true);
    }
  };

  const handleApprovalAction = async () => {
    try {
      if (approvalAction === "approve") {
        await parkingAPI.approveRequest(selectedRequest.id, {
          message: approvalMessage,
        });
        toast.success("Parking request approved!");
      } else {
        await parkingAPI.rejectRequest(selectedRequest.id, {
          message: approvalMessage,
        });
        toast.success("Parking request rejected");
      }
      setShowApprovalModal(false);
      setApprovalMessage("");
      setSelectedRequest(null);
      fetchParkingData();
    } catch (error) {
      console.error("Failed to process request:", error);
      toast.error("Failed to process request");
    }
  };

  const getSlotColor = (slot) => {
    if (slot.status === "MAINTENANCE") return "bg-yellow-200 border-yellow-400";
    if (slot.isOccupied || slot.status === "OCCUPIED")
      return "bg-red-200 border-red-400";
    return "bg-green-200 border-green-400";
  };

  const getSlotIcon = (slot) => {
    if (slot.status === "MAINTENANCE") return "🔧";
    if (slot.isOccupied) return <CarFront />;
    return <CircleParking />;
  };

  const handleAddSlots = async () => {
    try {
      const formData = new FormData();
      formData.append("count", newSlotsCount);
      formData.append("price", slotPrice);
      formData.append("telebirrPhone", telebirrPhone);
      if (qrCodeFile) {
        formData.append("qrCode", qrCodeFile);
      }

      await parkingAPI.createSlots(formData);
      toast.success(`${newSlotsCount} new parking slots added!`);
      setShowAddSlots(false);
      setNewSlotsCount(10);
      setSlotPrice(500);
      setTelebirrPhone("");
      setQrCodeFile(null);
      fetchParkingData();
    } catch (error) {
      console.error("Failed to add parking slots:", error);
      toast.error("Failed to add parking slots");
    }
  };

  const handleAddSingleSlot = async () => {
    try {
      await parkingAPI.createSlot({ feeMonthly: 500 });
      toast.success("New parking spot added!");
      fetchParkingData();
    } catch (error) {
      console.error("Failed to add parking spot:", error);
      toast.error("Failed to add parking spot");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm("Are you sure you want to delete this parking slot?")) {
      try {
        await parkingAPI.deleteSlot(slotId);
        toast.success("Parking slot deleted successfully");
        fetchParkingData();
      } catch (error) {
        console.error("Failed to delete parking slot:", error);
        toast.error("Failed to delete parking slot");
      }
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowSlotActions(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue">
          Parking Management
        </h1>
        <button
          onClick={() => setShowAddSlots(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Create Parking Area</span>
          <span className="sm:hidden">Add Slots</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Total Slots</h3>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {parkingSlots.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Occupied</h3>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {parkingSlots.filter((slot) => slot.isOccupied).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Available</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {
              parkingSlots.filter(
                (slot) => !slot.isOccupied && slot.status !== "MAINTENANCE"
              ).length
            }
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-semibold text-teal">Pending</h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">
            {parkingRequests.filter((req) => req.status === "PENDING").length}
          </p>
        </div>
      </div>

      {/* Add Slots Form */}
      {showAddSlots && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            Create New Parking Area
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of slots to add
              </label>
              <input
                type="number"
                value={newSlotsCount}
                onChange={(e) => setNewSlotsCount(parseInt(e.target.value))}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Fee (ETB)
              </label>
              <input
                type="number"
                value={slotPrice}
                onChange={(e) => setSlotPrice(parseInt(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telebirr Phone Number
              </label>
              <input
                type="tel"
                value={telebirrPhone}
                onChange={(e) => setTelebirrPhone(e.target.value)}
                placeholder="+251912345678"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code File (Image/PDF)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setQrCodeFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddSlots}
              className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add Slots
            </button>
            <button
              onClick={() => setShowAddSlots(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Parking Requests */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-teal mb-4 sm:mb-6">
          Parking Requests
        </h2>

        {parkingRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-light-green">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Slot Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parkingRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {request.resident.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Block {request.resident.block} -{" "}
                        {request.resident.houseNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.resident.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-dark-blue">
                        {request.slotNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.document ? (
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDocument(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <FileText size={16} />
                          <span>View Document</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No document
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.status === "PENDING" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveRequest(request)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve request"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject request"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No parking requests found
          </div>
        )}
      </div>

      {/* Visual Parking Grid */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-teal mb-4 sm:mb-6">Parking Layout</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {parkingSlots.map((slot) => (
            <div
              key={slot.id}
              className={`relative p-2 sm:p-3 rounded-lg border-2 text-center cursor-pointer hover:opacity-80 min-h-[90px] sm:min-h-[100px] flex flex-col justify-center ${getSlotColor(
                slot
              )}`}
              onClick={() => handleSlotClick(slot)}
            >
              <div className="text-lg sm:text-2xl mb-1">{getSlotIcon(slot)}</div>
              <div className="text-xs sm:text-sm font-bold text-dark-blue">
                {slot.slotNumber}
              </div>
              <div className="text-xs text-blue-600 font-semibold">
                {slot.price} ETB
              </div>
              {slot.isOccupied && slot.resident && (
                <div className="text-xs text-gray-600 mt-1 truncate">
                  {slot.resident.fullName}
                </div>
              )}
            </div>
          ))}
          <div
            className="relative p-2 sm:p-3 rounded-lg border-2 border-dashed border-gray-400 text-center cursor-pointer hover:bg-gray-50 bg-gray-100 min-h-[90px] sm:min-h-[100px] flex flex-col justify-center"
            onClick={handleAddSingleSlot}
          >
            <div className="text-lg sm:text-2xl mb-1 text-gray-400">+</div>
            <div className="text-xs font-bold text-gray-500">Add Spot</div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-200 border-2 border-green-400 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-400 rounded"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {showDocument && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Document</h3>
              <button
                onClick={() => setShowDocument(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Resident:</strong> {selectedRequest.resident.fullName}
              </p>
              <p>
                <strong>Slot:</strong> {selectedRequest.slotNumber}
              </p>
              <p>
                <strong>Document:</strong> {selectedRequest.document}
              </p>
              {selectedRequest.message && (
                <div className="mt-3">
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <p className="text-gray-700">{selectedRequest.message}</p>
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                {selectedRequest.document && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      File: {selectedRequest.document}
                    </p>
                    <div className="border rounded p-8 bg-white text-center">
                      <FileText
                        size={64}
                        className="mx-auto text-blue-500 mb-4"
                      />
                      <p className="text-sm text-gray-600 mb-4">
                        Payment Proof Document
                      </p>
                      <a
                        href={`https://rmsb-2wjb.onrender.com/uploads/documents/${selectedRequest.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm inline-block"
                      >
                        Preview File
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval/Rejection Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {approvalAction === "approve" ? "Approve" : "Reject"} Request
              </h3>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Resident:</strong> {selectedRequest.resident.fullName}
              </p>
              <p>
                <strong>Slot:</strong> {selectedRequest.slotNumber}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to resident (optional)
              </label>
              <textarea
                value={approvalMessage}
                onChange={(e) => setApprovalMessage(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder={
                  approvalAction === "approve"
                    ? "Congratulations! Your parking request has been approved."
                    : "Sorry, your parking request has been rejected."
                }
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleApprovalAction}
                className={`flex-1 px-4 py-2 rounded-lg text-white ${
                  approvalAction === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {approvalAction === "approve" ? "Approve" : "Reject"}
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Actions Modal */}
      {showSlotActions && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Slot {selectedSlot.slotNumber}
              </h3>
              <button
                onClick={() => setShowSlotActions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Status:</strong> {selectedSlot.status}
              </p>
              <p>
                <strong>Price:</strong> {selectedSlot.price} ETB/month
              </p>
              <p>
                <strong>Occupied:</strong>{" "}
                {selectedSlot.isOccupied ? "Yes" : "No"}
              </p>
              {selectedSlot.resident && (
                <p>
                  <strong>Resident:</strong> {selectedSlot.resident.fullName}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteSlot(selectedSlot.id)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete Slot</span>
              </button>
              <button
                onClick={() => setShowSlotActions(false)}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParking;
