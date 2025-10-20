import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-light-green">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout