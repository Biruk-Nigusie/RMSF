import { Link, useLocation } from 'react-router-dom'
import { Home, Building, Shield, Activity, Settings, Database } from 'lucide-react'

const SuperAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/super-admin-dashboard', icon: Home, label: 'Dashboard' },
    { path: '/super-admin/condominiums', icon: Building, label: 'Condominiums' },
    { path: '/super-admin/admins', icon: Shield, label: 'Admins' },
    { path: '/super-admin/audit', icon: Activity, label: 'Audit Logs' },
    { path: '/super-admin/integrations', icon: Settings, label: 'Integrations' },
    { path: '/super-admin/backup', icon: Database, label: 'Data Management' },
  ]

  const handleLinkClick = () => {
    if (setSidebarOpen) setSidebarOpen(false)
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-dark-blue">Super Admin</h2>
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

export default SuperAdminSidebar