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
import { UploadButton } from "../utils/uploadthing";

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
    profileImageUrl: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (editing) return; // Don't fetch when editing
      
      try {
        const response = await authAPI.getProfile();
        const profileUser = response.data;
        
        // Update Redux store with fresh data from API
        dispatch(updateUser(profileUser));
        
        setProfileData({
          fullName: profileUser.fullName || "",
          email: profileUser.email || "",
          phone: profileUser.phone || "",
          block: profileUser.block || "",
          houseNo: profileUser.houseNo || "",
          familyMembers: profileUser.familyMembers || "",
          carPlate: profileUser.carPlate || "",
          profileImage: null,
          profileImageUrl: profileUser.profileImage || null,
        });
        setImagePreview(profileUser.profileImage || null);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
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
        }
      }
    };
    
    fetchProfile();
  }, [user, dispatch, editing]);

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
      const updateData = {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        block: profileData.block,
        houseNo: profileData.houseNo,
        familyMembers: profileData.familyMembers,
        carPlate: profileData.carPlate,
      };

      if (profileData.profileImageUrl) {
        updateData.profileImage = profileData.profileImageUrl;
      }

      const response = await authAPI.updateProfile(updateData);
      const updatedUser = { 
        ...response.data, 
        profileImage: updateData.profileImage || response.data.profileImage || user.profileImage 
      };
      dispatch(updateUser(updatedUser));
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
                <div className="absolute -bottom-2 -right-2">
                  <UploadButton
                    endpoint="profileImage"
                    onClientUploadComplete={async (res) => {
                      console.log('=== UPLOAD COMPLETE DEBUG ===');
                      console.log('Upload response:', res);
                      
                      const imageUrl = res[0].ufsUrl || res[0].url;
                      console.log('Image URL:', imageUrl);
                      
                      setImagePreview(imageUrl);
                      setProfileData(prev => ({ ...prev, profileImageUrl: imageUrl }));
                      
                      // Save image URL to database immediately
                      try {
                        console.log('Sending profile update with data:', { profileImage: imageUrl });
                        const response = await authAPI.updateProfile({ profileImage: imageUrl });
                        console.log('Profile update response:', response);
                        
                        // Update Redux store with new profile image
                        const updatedUser = { ...response.data, profileImage: imageUrl };
                        dispatch(updateUser(updatedUser));
                        
                        toast.success("Profile image updated successfully!");
                      } catch (error) {
                        console.error('=== PROFILE UPDATE ERROR ===');
                        console.error('Error object:', error);
                        console.error('Error response:', error.response);
                        console.error('Error data:', error.response?.data);
                        console.error('Error status:', error.response?.status);
                        console.error('=== ERROR END ===');
                        toast.error('Failed to save profile image');
                      }
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    className="ut-button:bg-medium-green ut-button:text-white ut-button:text-xs ut-button:px-2 ut-button:py-1"
                  />
                </div>
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
