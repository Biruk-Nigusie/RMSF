import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useTheme } from '../contexts/ThemeContext'
import { LogOut, User, Moon, Sun, Menu, X } from 'lucide-react'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { isDark, toggleTheme, sidebarOpen, toggleSidebar } = useTheme()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-dark-blue dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={toggleSidebar}
                className="hover:text-medium-green transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
            <Link to="/" className="text-xl font-bold">
              RMS
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="hover:text-medium-green transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span className="text-sm">{user?.fullName || user?.name || 'Profile'}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-medium-green transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-medium-green hover:bg-teal px-4 py-2 rounded transition-colors">
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