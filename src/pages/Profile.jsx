import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authAPI } from "../services/api";
import { updateUser } from "../store/authSlice";
import { toast } from "react-toastify";
import {
  User,
  Edit,
  Save,
  X,
  Camera,
  Phone,
  Mail,
  Home,
  Users,
} from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    block: "",
    houseNo: "",
    familyMembers: "",
    carPlate: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        block: user.block || "",
        houseNo: user.houseNo || "",
        familyMembers: user.familyMembers || "",
        carPlate: user.carPlate || "",
        profileImage: null,
      });
      setImagePreview(
        user.profileImage
          ? `http:localhost:3000/uploads/profiles/${user.profileImage}`
          : null
      );
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", profileData.fullName);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("block", profileData.block);
      formData.append("houseNo", profileData.houseNo);
      formData.append("familyMembers", profileData.familyMembers);
      formData.append("carPlate", profileData.carPlate);

      if (profileData.profileImage) {
        formData.append("profileImage", profileData.profileImage);
      }

      const response = await authAPI.updateProfile(formData);
      dispatch(updateUser(response.data));
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      block: user.block || "",
      houseNo: user.houseNo || "",
      familyMembers: user.familyMembers || "",
      carPlate: user.carPlate || "",
      profileImage: null,
    });
    setImagePreview(
      user.profileImage
        ? `http:localhost:3000/uploads/profiles/${user.profileImage}`
        : null
    );
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue">
          Profile Management
        </h1>
        <p className="text-teal text-sm sm:text-base">
          Manage your personal information
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              {editing && (
                <label className="absolute bottom-0 right-0 bg-medium-green text-white rounded-full p-1 cursor-pointer hover:bg-teal">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-dark-blue">
                {user?.fullName}
              </h2>
              <p className="text-gray-600">
                {user?.type === "admin" ? "Administrator" : "Resident"}
              </p>
              {user?.block && (
                <p className="text-sm text-gray-500">
                  Block {user.block} - Unit {user.houseNo}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm sm:text-base"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm sm:text-base disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{loading ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm sm:text-base"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-2" />
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">
                {user?.fullName || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email
            </label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">
                {user?.email || "Not provided"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone size={16} className="inline mr-2" />
              Phone Number
            </label>
            {editing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">
                {user?.phone || "Not provided"}
              </p>
            )}
          </div>

          {user?.type !== "admin" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home size={16} className="inline mr-2" />
                  Block Number
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="block"
                    value={profileData.block}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {user?.block || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home size={16} className="inline mr-2" />
                  House Number
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="houseNo"
                    value={profileData.houseNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {user?.houseNo || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users size={16} className="inline mr-2" />
                  Family Members
                </label>
                {editing ? (
                  <input
                    type="number"
                    name="familyMembers"
                    value={profileData.familyMembers}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {user?.familyMembers || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Plate Number
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="carPlate"
                    value={profileData.carPlate}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {user?.carPlate || "Not provided"}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
