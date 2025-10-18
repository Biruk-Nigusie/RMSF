import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ekubEddirAPI } from "../services/api";
import {
  Users,
  Plus,
  CreditCard,
  Calendar,
  DollarSign,
  Settings,
  Bell,
  Shuffle,
  UserPlus,
  MessageSquare,
} from "lucide-react";

const EkubEddir = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [createFormData, setCreateFormData] = useState({
    name: "",
    type: "EKUB",
    monthlyContribution: "",
    maxMembers: "",
    description: "",
    telebirrPhone: "",
    qrCodeFile: null,
  });
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "CASH",
    roundNo: 1,
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await ekubEddirAPI.getAll();
      setGroups(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast.error("Failed to fetch groups");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", createFormData.name);
      formData.append("type", createFormData.type);
      formData.append(
        "monthlyContribution",
        createFormData.monthlyContribution
      );
      formData.append("maxMembers", createFormData.maxMembers);
      formData.append("description", createFormData.description);
      formData.append("telebirrPhone", createFormData.telebirrPhone);
      if (createFormData.qrCodeFile) {
        formData.append("qrCodeFile", createFormData.qrCodeFile);
      }

      await ekubEddirAPI.create(formData);
      toast.success("Group created successfully!");
      setShowCreateForm(false);
      setCreateFormData({
        name: "",
        type: "EKUB",
        monthlyContribution: "",
        maxMembers: "",
        description: "",
        telebirrPhone: "",
        qrCodeFile: null,
      });
      fetchGroups();
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error("Failed to create group");
    }
  };

  const handleJoinRequest = async (groupId) => {
    try {
      await ekubEddirAPI.join(groupId);
      toast.success("Join request sent!");
      fetchGroups();
    } catch (error) {
      console.error("Failed to send join request:", error);
      toast.error("Failed to send join request");
    }
  };

  const handleApproveJoin = async (groupId, requestId) => {
    try {
      await ekubEddirAPI.approveJoin(groupId, requestId);
      toast.success("Member approved!");
      fetchGroups();
    } catch (error) {
      console.error("Failed to approve member:", error);
      toast.error("Failed to approve member");
    }
  };

  const handleSelectWinner = async (groupId) => {
    if (
      window.confirm(
        "Are you sure you want to select a winner? This action cannot be undone."
      )
    ) {
      try {
        const response = await ekubEddirAPI.selectWinner(groupId);
        toast.success(
          `🏆 Winner selected: ${response.data?.winner || "Random member"}!`
        );
        fetchGroups();
      } catch (error) {
        console.error("Failed to select winner:", error);
        toast.error(error.response?.data?.error || "Failed to select winner");
      }
    }
  };

  const handleSendReminder = async (groupId) => {
    try {
      const response = await ekubEddirAPI.sendReminder(groupId);
      const { unpaidCount, totalMembers } = response.data;
      toast.success(
        `📢 Reminders sent to ${unpaidCount} of ${totalMembers} members!`
      );
    } catch (error) {
      console.error("Failed to send reminders:", error);
      toast.error("Failed to send reminders");
    }
  };

  const handlePayment = async () => {
    try {
      if (!paymentData.proofFile) {
        toast.error("Please upload payment proof");
        return;
      }

      const formData = new FormData();
      formData.append("amount", selectedGroup.monthlyContribution);
      formData.append("method", "TELEBIRR");
      formData.append("roundNo", 1);
      formData.append("proofFile", paymentData.proofFile);

      await ekubEddirAPI.makePayment(selectedGroup.id, formData);
      toast.success("Payment submitted successfully!");
      setShowPayment(false);
      setSelectedGroup(null);
      setPaymentData({
        amount: "",
        method: "TELEBIRR",
        roundNo: 1,
        proofFile: null,
      });
      fetchGroups();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed");
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const getTypeColor = (type) => {
    return type === "EKUB"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };

  const getStatusColor = (status) => {
    return status === "ACTIVE"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  const filteredGroups = groups.filter((group) => {
    if (activeTab === "my") return group.isMember;
    if (activeTab === "admin") return group.isAdmin;
    return true;
  });

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
          Ekub & Eddir Groups
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Create Group</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "all"
              ? "bg-medium-green text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All Groups
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "my"
              ? "bg-medium-green text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          My Groups
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "admin"
              ? "bg-medium-green text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          I Manage
        </button>
      </div>

      {/* Create Group Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            Create New Group
          </h2>
          <form onSubmit={handleCreateGroup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleCreateFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={createFormData.type}
                  onChange={handleCreateFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="EKUB">Ekub</option>
                  <option value="EDDIR">Eddir</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution ($)
                </label>
                <input
                  type="number"
                  name="monthlyContribution"
                  value={createFormData.monthlyContribution}
                  onChange={handleCreateFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Members
                </label>
                <input
                  type="number"
                  name="maxMembers"
                  value={createFormData.maxMembers}
                  onChange={handleCreateFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telebirr Phone
                </label>
                <input
                  type="tel"
                  name="telebirrPhone"
                  value={createFormData.telebirrPhone}
                  onChange={handleCreateFormChange}
                  placeholder="+251912345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code File
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      qrCodeFile: e.target.files[0],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={createFormData.description}
                onChange={handleCreateFormChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                Create Group
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment Form */}
      {showPayment && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 w-full"
            style={{ maxWidth: "548px" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pay with Telebirr</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold text-dark-blue mb-2">
                Amount: {selectedGroup.monthlyContribution} ETB
              </p>
              <p className="text-sm text-gray-600">
                Group: {selectedGroup.name}
              </p>
            </div>

            <div className="mb-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                Payment Details
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Phone Number:</p>
                  <p className="font-mono text-lg text-blue-800">
                    {selectedGroup.telebirrPhone}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">QR Code:</p>
                  <div className="bg-white p-2 rounded w-full">
                    {selectedGroup.qrCodePath ? (
                      <div>
                        <img
                          src={`https://rmsb-2wjb.onrender.com/uploads/qr-codes/${selectedGroup.qrCodePath}`}
                          alt="Payment QR Code"
                          className="pt-4 ml-auto mr-auto w-100 h-100 object-cover flex align-items-center justify-content-center"
                          onLoad={() =>
                            console.log(
                              "✅ QR loaded successfully:",
                              selectedGroup.qrCodePath
                            )
                          }
                          onError={(e) => {
                            console.error(
                              "❌ QR failed to load:",
                              selectedGroup.qrCodePath
                            );
                            console.error(
                              "Full URL:",
                              `https://rmsb-2wjb.onrender.com/uploads/qr-codes/${selectedGroup.qrCodePath}`
                            );
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-96 bg-red-100 flex items-center justify-center text-xs text-red-600 hidden">
                          QR Code Failed
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        No QR Code Uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Payment Proof
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    proofFile: e.target.files[0],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePayment}
                className="flex-1 bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit Payment
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

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-medium-green text-white rounded-full p-2">
                  <Users size={20} />
                </div>
                <h3 className="text-xl font-semibold text-dark-blue">
                  {group.name}
                </h3>
              </div>
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(
                    group.type
                  )}`}
                >
                  {group.type}
                </span>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    group.status
                  )}`}
                >
                  {group.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <DollarSign size={16} className="text-teal" />
                  <span className="text-lg font-semibold text-dark-blue">
                    ${group.monthlyContribution}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Monthly</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Users size={16} className="text-medium-green" />
                  <span className="text-lg font-semibold text-dark-blue">
                    {group.totalMembers}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Members</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Admin:{" "}
                <span className="font-medium">{group.admin.fullName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Current Round:{" "}
                <span className="font-medium">{group.currentRound}</span>
              </p>
              <p className="text-sm text-gray-600">
                Payment Method:{" "}
                <span className="font-medium">{group.paymentMethod}</span>
              </p>
              {group.currentWinner && (
                <p className="text-sm text-green-600 font-semibold">
                  🏆 Current Winner: {group.currentWinner.fullName}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
              <Calendar size={16} />
              <span>
                Next Payment:{" "}
                {new Date(group.nextPaymentDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-2">
                {group.isAdmin && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowManage(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center space-x-1"
                    >
                      <Settings size={14} />
                      <span>Manage</span>
                    </button>
                    <button
                      onClick={() => handleSelectWinner(group.id)}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium flex items-center space-x-1"
                    >
                      <Shuffle size={14} />
                      <span>Select Winner</span>
                    </button>
                    <button
                      onClick={() => handleSendReminder(group.id)}
                      className="text-orange-600 hover:text-orange-900 text-sm font-medium flex items-center space-x-1"
                    >
                      <Bell size={14} />
                      <span>Remind</span>
                    </button>
                  </>
                )}
                {!group.isMember && (
                  <button
                    onClick={() => handleJoinRequest(group.id)}
                    className="text-green-600 hover:text-green-900 text-sm font-medium flex items-center space-x-1"
                  >
                    <UserPlus size={14} />
                    <span>Join</span>
                  </button>
                )}
              </div>
              {group.isMember && (
                <button
                  onClick={() => {
                    setSelectedGroup(group);
                    setPaymentData({
                      ...paymentData,
                      amount: group.monthlyContribution,
                    });
                    setShowPayment(true);
                  }}
                  className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <CreditCard size={16} />
                  <span>Pay with Telebirr</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Group Management Modal */}
      {showManage && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-teal">
                Manage {selectedGroup.name}
              </h2>
              <button
                onClick={() => setShowManage(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Join Requests */}
            {selectedGroup.joinRequests?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Join Requests</h3>
                {selectedGroup.joinRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div>
                      <span className="font-medium">{request.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          handleApproveJoin(selectedGroup.id, request.id)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Members List */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Members ({selectedGroup.totalMembers})
              </h3>
              <div className="space-y-2">
                {selectedGroup.members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{member.name}</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          member.hasPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.hasPaid ? "✓ Paid" : "✗ Unpaid"}
                      </span>
                      {member.hasWon && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                          🏆 Winner
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcement Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Send Announcement</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                />
                <button className="bg-medium-green text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <MessageSquare size={16} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              No Groups Available
            </h3>
            <p className="text-gray-500">
              Ekub and Eddir groups will be listed here when you join them.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EkubEddir;
