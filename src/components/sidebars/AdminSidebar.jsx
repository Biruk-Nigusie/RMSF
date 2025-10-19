import { Link, useLocation } from 'react-router-dom'
import { Home, Users, MessageSquare, Car, Zap, AlertCircle, FileText, DollarSign, Settings } from 'lucide-react'

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/admin-dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/residents', icon: Users, label: 'Residents' },
    { path: '/admin/announcements', icon: FileText, label: 'Announcements' },
    { path: '/admin/complaints', icon: AlertCircle, label: 'Complaints' },
    { path: '/admin/parking', icon: Car, label: 'Parking' },
    { path: '/admin/utilities', icon: Zap, label: 'Utilities' },
    { path: '/admin/groups', icon: Users, label: 'Ekub/Eddir' },
    { path: '/admin/services', icon: MessageSquare, label: 'Services' },
    { path: '/admin/finance', icon: DollarSign, label: 'Finance' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  const handleLinkClick = () => {
    if (setSidebarOpen) setSidebarOpen(false)
  }

  return (
    <div className="w-64 bg-white shadow-sm h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-dark-blue">Admin Portal</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-medium-green text-white'
                  : 'text-gray-700 hover:bg-light-green hover:text-teal'
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

export default AdminSidebar