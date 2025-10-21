// components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Building, 
  Bell, 
  Search,
  ChevronDown
} from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsProfileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (user?.type === "admin") return "/admin-dashboard";
    if (user?.type === "super_admin") return "/super-admin-dashboard";
    return "/dashboard";
  };

  const getUserRoleDisplay = () => {
    if (user?.type === "admin") return "Property Manager";
    if (user?.type === "super_admin") return "Super Admin";
    return "Resident";
  };

  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
          : "bg-dark-blue text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 flex-shrink-0"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isScrolled ? "bg-teal" : "bg-teal"
            }`}>
              <Building size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold ${
                isScrolled ? "text-dark-blue" : "text-white"
              }`}>
                RMS
              </span>
              <span className={`text-xs ${
                isScrolled ? "text-gray-600" : "text-blue-200"
              }`}>
                Residential
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Public Links */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-teal ${
                    isScrolled ? "text-gray-700" : "text-white"
                  } ${
                    location.pathname === link.path 
                      ? isScrolled ? "text-teal" : "text-teal" 
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Navigation - Authenticated User */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar */}
              <div className={`relative ${
                isScrolled ? "text-gray-600" : "text-white"
              }`}>
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    isScrolled 
                      ? "bg-gray-50 border-gray-300 focus:bg-white focus:border-teal" 
                      : "bg-white/10 border-white/20 focus:bg-white/20 focus:border-white/40"
                  } focus:outline-none focus:ring-2 focus:ring-teal/50`}
                />
              </div>

              {/* Notifications */}
              <button 
                className={`p-2 rounded-lg transition-colors relative ${
                  isScrolled 
                    ? "hover:bg-gray-100 text-gray-600" 
                    : "hover:bg-white/10 text-white"
                }`}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          )}

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                    isScrolled 
                      ? "hover:bg-gray-100 text-gray-700" 
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-sm font-semibold">
                    {user?.fullName?.charAt(0) || user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-medium ${
                      isScrolled ? "text-gray-900" : "text-white"
                    }`}>
                      {user?.fullName || user?.name || "User"}
                    </div>
                    <div className={`text-xs ${
                      isScrolled ? "text-gray-500" : "text-blue-200"
                    }`}>
                      {getUserRoleDisplay()}
                    </div>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-2 ${
                    isScrolled 
                      ? "bg-white border border-gray-200" 
                      : "bg-dark-blue border border-white/20"
                  }`}>
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                        isScrolled 
                          ? "hover:bg-gray-50 text-gray-700" 
                          : "hover:bg-white/10 text-white"
                      }`}
                    >
                      <User size={18} />
                      <span>Profile Settings</span>
                    </Link>
                    
                    <Link
                      to={getDashboardPath()}
                      className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                        isScrolled 
                          ? "hover:bg-gray-50 text-gray-700" 
                          : "hover:bg-white/10 text-white"
                      }`}
                    >
                      <Building size={18} />
                      <span>Dashboard</span>
                    </Link>

                    <div className={`border-t my-2 ${
                      isScrolled ? "border-gray-200" : "border-white/20"
                    }`}></div>

                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-3 w-full px-4 py-3 transition-colors ${
                        isScrolled 
                          ? "hover:bg-gray-50 text-red-600" 
                          : "hover:bg-white/10 text-red-400"
                      }`}
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${
                    isScrolled 
                      ? "text-gray-700 hover:text-teal" 
                      : "text-white hover:text-teal"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-teal hover:bg-dark-teal text-white px-6 py-2 rounded-lg font-medium transition-colors transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {isAuthenticated && (
              <>
                {/* Mobile Notifications */}
                <button 
                  className={`p-2 rounded-lg transition-colors relative ${
                    isScrolled 
                      ? "hover:bg-gray-100 text-gray-600" 
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Mobile Profile */}
                <Link
                  to="/profile"
                  className={`p-2 rounded-lg transition-colors ${
                    isScrolled 
                      ? "hover:bg-gray-100 text-gray-600" 
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <User size={20} />
                </Link>
              </>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? "hover:bg-gray-100 text-gray-600" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isScrolled ? "border-gray-200" : "border-white/20"
          }`}>
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                {publicLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium transition-colors hover:text-teal ${
                      isScrolled ? "text-gray-700" : "text-white"
                    } ${
                      location.pathname === link.path 
                        ? isScrolled ? "text-teal" : "text-teal" 
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className={`block text-center font-medium transition-colors ${
                      isScrolled 
                        ? "text-gray-700 hover:text-teal" 
                        : "text-white hover:text-teal"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-teal hover:bg-dark-teal text-white px-6 py-3 rounded-lg font-medium transition-colors mt-2"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-2">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-semibold">
                    {user?.fullName?.charAt(0) || user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      isScrolled ? "text-gray-900" : "text-white"
                    }`}>
                      {user?.fullName || user?.name || "User"}
                    </div>
                    <div className={`text-sm ${
                      isScrolled ? "text-gray-500" : "text-blue-200"
                    }`}>
                      {getUserRoleDisplay()}
                    </div>
                  </div>
                </div>

                <div className={`border-t ${
                  isScrolled ? "border-gray-200" : "border-white/20"
                }`}></div>

                {/* Mobile Menu Links */}
                <Link
                  to={getDashboardPath()}
                  className={`font-medium transition-colors hover:text-teal ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`font-medium transition-colors hover:text-teal ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  Profile Settings
                </Link>

                <div className={`border-t ${
                  isScrolled ? "border-gray-200" : "border-white/20"
                }`}></div>

                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 font-medium transition-colors ${
                    isScrolled ? "text-red-600" : "text-red-400"
                  }`}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Overlay for profile menu */}
      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setIsProfileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;