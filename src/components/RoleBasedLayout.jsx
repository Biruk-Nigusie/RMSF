import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import ResidentSidebar from './sidebars/ResidentSidebar'
import AdminSidebar from './sidebars/AdminSidebar'
import SuperAdminSidebar from './sidebars/SuperAdminSidebar'
import Navbar from './Navbar'

const RoleBasedLayout = () => {
  const { user } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const getSidebar = () => {
    if (user?.type === 'admin' && user?.role === 'SUPER_ADMIN') {
      return <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    } else if (user?.type === 'admin') {
      return <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    } else {
      return <ResidentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    }
  }

  return (
    <div className="min-h-screen bg-light-green">
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          {user && getSidebar()}
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative">
              {user && getSidebar()}
            </div>
          </div>
        )}
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RoleBasedLayout