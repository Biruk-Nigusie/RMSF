import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { LogOut, User, Menu, X } from 'lucide-react'

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-dark-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden hover:text-medium-green transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
            <Link to="/" className="text-xl font-bold">
              RMS
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-6">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <User size={20} />
                  <span className="text-sm">{user?.fullName || user?.name || 'Profile'}</span>
                </div>
                <div className="sm:hidden">
                  <User size={20} />
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-medium-green transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-medium-green hover:bg-teal px-3 sm:px-4 py-2 rounded transition-colors text-sm sm:text-base">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar