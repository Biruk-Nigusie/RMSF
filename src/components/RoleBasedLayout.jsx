import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import ResidentSidebar from './sidebars/ResidentSidebar'
import AdminSidebar from './sidebars/AdminSidebar'
import SuperAdminSidebar from './sidebars/SuperAdminSidebar'
import Navbar from './Navbar'

const RoleBasedLayout = () => {
  const { user } = useSelector((state) => state.auth)
  const { sidebarOpen } = useTheme()

  const getSidebar = () => {
    if (user?.type === 'admin' && user?.role === 'SUPER_ADMIN') {
      return <SuperAdminSidebar />
    } else if (user?.type === 'admin') {
      return <AdminSidebar />
    } else {
      return <ResidentSidebar />
    }
  }

  return (
    <div className="min-h-screen bg-light-green dark:bg-gray-800">
      <Navbar />
      <div className="flex">
        {user && sidebarOpen && getSidebar()}
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RoleBasedLayout