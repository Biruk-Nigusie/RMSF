import { useState, useEffect } from "react";
import { parkingAPI } from "../services/api";
import { toast } from "react-toastify";
import {
  Car,
  CreditCard,
  MapPin,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  Copy,
  XCircle,
  CircleParking,
  CarFront,
} from "lucide-react";

const Parking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [mySlot, setMySlot] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [requestData, setRequestData] = useState({
    slotId: "",
    document: null,
    message: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [telebirrInfo, setTelebirrInfo] = useState({
    phone: "+251912345678",
    qrCode: "https://example.com/qr-code.png",
  });
  const [gridSize, setGridSize] = useState({ rows: 5, cols: 8 });

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      // Fetch slots first (doesn't require auth)
      const slotsResponse = await parkingAPI.getSlots();
      setParkingSlots(slotsResponse.data?.data || slotsResponse.data || []);

      // Try to fetch user requests (may fail if not authenticated)
      try {
        const requestsResponse = await parkingAPI.getMyRequests();
        setMyRequests(
          requestsResponse.data?.data || requestsResponse.data || []
        );
      } catch (requestError) {
        console.log("User not authenticated for requests:", requestError);
        setMyRequests([]);
      }

      // Find user's assigned slot
      const slots = slotsResponse.data?.data || slotsResponse.data || [];
      const userSlot = slots.find(
        (slot) => slot.isAssigned && slot.isCurrentUser
      );
      setMySlot(userSlot);
    } catch (error) {
      console.error("Failed to fetch parking data:", error);
      // Don't show error toast for auth issues
      if (error.response?.status !== 401) {
        toast.error("Failed to fetch parking data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSlotRequest = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("requestedSlot", selectedSlot.slotNumber);
      if (requestData.document) {
        formData.append("document", requestData.document);
      }
      formData.append("message", requestData.message);

      await parkingAPI.requestSlot(formData);
      toast.success("Parking request submitted successfully!");
      setShowRequestForm(false);
      setSelectedSlot(null);
      setRequestData({ slotId: "", document: null, message: "" });
      fetchParkingData();
    } catch (error) {
      console.error("Failed to submit request:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to submit parking requests");
      } else {
        toast.error(error.response?.data?.error || "Failed to submit request");
      }
    }
  };

  const handleFileChange = (e) => {
    setRequestData({
      ...requestData,
      document: e.target.files[0],
    });
  };

  const handleRequestChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const getSlotColor = (slot) => {
    if (slot.status === "MAINTENANCE") return "bg-yellow-200 border-yellow-400";
    if (slot.isOccupied) return "bg-red-200 border-red-400";
    return "bg-green-200 border-green-400";
  };

  const getSlotIcon = (slot) => {
    if (slot.status === "MAINTENANCE") return "🔧";
    if (slot.isOccupied) return <CarFront />;
    return <CircleParking />;
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
      <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue mb-6 sm:mb-8">
        Parking Management
      </h1>

      {/* My Requests */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-teal mb-4">
          My Parking Requests
        </h2>
        {myRequests.length > 0 ? (
          <div className="space-y-3">
            {myRequests.map((request) => (
              <div
                key={request.id}
                className="p-3 sm:p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2 sm:gap-0">
                  <div>
                    <span className="font-medium text-base sm:text-lg">
                      Slot {request.slotNumber}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 block sm:inline sm:ml-2">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                        request.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status === "PENDING" && (
                        <Clock size={12} className="inline mr-1" />
                      )}
                      {request.status === "APPROVED" && (
                        <CheckCircle size={12} className="inline mr-1" />
                      )}
                      {request.status === "REJECTED" && (
                        <XCircle size={12} className="inline mr-1" />
                      )}
                      {request.status}
                    </span>
                    {request.status === "APPROVED" && (
                      <span className="text-xs text-blue-600 font-medium">
                        ✓ Request Approved
                      </span>
                    )}
                    {request.status === "REJECTED" && (
                      <span className="text-xs text-red-600 font-medium">
                        ✗ Request Rejected
                      </span>
                    )}
                  </div>
                </div>

                {request.message && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-700">
                      <strong>Message:</strong> {request.message}
                    </p>
                  </div>
                )}

                {request.adminMessage && (
                  <div className="mb-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <strong>Admin Response:</strong> {request.adminMessage}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  {request.document && (
                    <span className="flex items-center">
                      <FileText size={12} className="mr-1" />
                      Document: {request.document}
                    </span>
                  )}
                  {request.monthlyFee && (
                    <span className="font-semibold text-green-600">
                      Monthly Fee: {request.monthlyFee} ETB
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Car size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No parking requests yet</p>
            <p className="text-sm">
              Click on available slots below to request parking
            </p>
          </div>
        )}
      </div>

      {/* My Parking Slot */}
      {mySlot && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-semibold text-teal flex items-center space-x-2">
              <Car size={20} sm:size={24} />
              <span>My Parking Slot</span>
            </h2>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-medium-green hover:bg-teal text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base"
            >
              <CreditCard size={16} sm:size={20} />
              <span className="hidden sm:inline">Pay Monthly Fee</span>
              <span className="sm:hidden">Pay Fee</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Slot Number</p>
              <p className="text-2xl font-bold text-dark-blue">
                {mySlot.slotNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-lg text-dark-blue">Ground Floor</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Fee</p>
              <p className="text-lg text-dark-blue">${mySlot.monthlyFee}</p>
            </div>
          </div>
        </div>
      )}

      {/* Request Form */}
      {showRequestForm && selectedSlot && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-teal mb-4">
            Request Parking Slot {selectedSlot.slotNumber}
          </h2>
          <form onSubmit={handleSlotRequest}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Proof Document
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload payment receipt or proof (PDF, JPG, PNG)
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={requestData.message}
                onChange={handleRequestChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Any additional information..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-4 sm:px-6 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Upload size={16} />
                <span>Submit Request</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRequestForm(false);
                  setSelectedSlot(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Parking Grid */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold text-teal flex items-center space-x-2">
            <MapPin size={20} sm:size={24} />
            <span>Parking Layout</span>
          </h2>
          <div className="text-xs sm:text-sm text-gray-600">
            Total: {parkingSlots.length} slots
          </div>
        </div>

        {/* Parking Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 mb-6">
          {parkingSlots.map((slot) => (
            <div
              key={slot.id}
              className={`relative p-2 sm:p-3 rounded-lg border-2 text-center cursor-pointer transition-all hover:shadow-md min-h-[80px] sm:min-h-[90px] flex flex-col justify-center ${getSlotColor(
                slot
              )}`}
              onClick={() => {
                if (!slot.isOccupied && slot.status !== "MAINTENANCE") {
                  setSelectedSlot(slot);
                  setShowRequestForm(true);
                }
              }}
            >
              <div className="text-lg sm:text-2xl mb-1">
                {getSlotIcon(slot)}
              </div>
              <div className="text-xs sm:text-sm font-bold text-dark-blue">
                {slot.slotNumber}
              </div>
              {slot.isOccupied && slot.resident && (
                <div className="text-xs text-gray-600 mt-1 truncate">
                  {slot.resident.fullName}
                </div>
              )}
              {slot.status === "MAINTENANCE" && (
                <div className="text-xs text-yellow-700 mt-1">Maintenance</div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-200 border-2 border-green-400 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-200 border-2 border-red-400 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-200 border-2 border-yellow-400 rounded"></div>
            <span>Maintenance</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
          Click on available slots to request parking
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pay Parking Fee</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-dark-blue mb-2">
                Monthly Fee: ${mySlot?.monthlyFee || 50}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              >
                <option value="telebirr">Telebirr</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            {paymentMethod === "telebirr" && (
              <div className="mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Pay with Telebirr
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Phone Number:</p>
                      <p className="font-mono text-lg text-blue-800">
                        {telebirrInfo.phone}
                      </p>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(telebirrInfo.phone)
                        }
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Copy number
                      </button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Or scan QR code:
                      </p>
                      <div className="bg-white p-2 rounded border inline-block">
                        <img
                          src={telebirrInfo.qrCode}
                          alt="Telebirr QR Code"
                          className="w-32 h-32"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500 hidden">
                          QR Code
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  toast.success(
                    "Payment initiated! Please complete the payment."
                  );
                  setShowPayment(false);
                }}
                className="flex-1 bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg transition-colors"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
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

export default Parking;
