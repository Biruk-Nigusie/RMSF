import { Link, useLocation } from 'react-router-dom'
import { Home, MessageSquare, Car, Zap, AlertCircle, Users, FileText } from 'lucide-react'

const ResidentSidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/announcements', icon: FileText, label: 'Announcements' },
    { path: '/complaints', icon: AlertCircle, label: 'My Complaints' },
    { path: '/parking', icon: Car, label: 'Parking' },
    { path: '/utilities', icon: Zap, label: 'Utilities' },
    { path: '/ekub-eddir', icon: Users, label: 'Ekub/Eddir' },
    { path: '/services', icon: MessageSquare, label: 'Services' },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-dark-blue dark:text-white">Resident Portal</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-medium-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-light-green dark:hover:bg-gray-700 hover:text-teal dark:hover:text-medium-green'
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default ResidentSidebar