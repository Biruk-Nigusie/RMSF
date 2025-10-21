import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { LogOut, User, Menu, X } from "lucide-react";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-dark-blue text-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side (menu icon + logo + nav links) */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden hover:text-medium-blue transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white hover:text-medium-blue transition-colors">
                RMSF
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6 ml-6">
              <Link
                to="/"
                className="hover:text-medium-blue transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-medium-blue transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-medium-blue transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side (Profile / Login / Logout) */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center space-x-2 hover:text-medium-blue transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm">
                    {user?.fullName || user?.name || "Profile"}
                  </span>
                </Link>

                {/* Mobile profile icon */}
                <Link
                  to="/profile"
                  className="sm:hidden hover:text-medium-blue transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-medium-blue transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-900 hover:bg-blue-800 px-3 sm:px-8 py-2 rounded transition-colors text-sm sm:text-base text-white"
              >
                <strong style={{ color: "white" }}>Login</strong>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
