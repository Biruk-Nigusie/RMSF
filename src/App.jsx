import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './store/store'
import Layout from './components/Layout'
import RoleBasedLayout from './components/RoleBasedLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'

// Resident Pages
import Dashboard from './pages/Dashboard'
import Complaints from './pages/Complaints'
import Announcements from './pages/Announcements'
import Parking from './pages/Parking'
import Utilities from './pages/Utilities'
import Services from './pages/Services'
import EkubEddir from './pages/EkubEddir'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import AdminResidents from './pages/admin/AdminResidents'
import AdminComplaints from './pages/admin/AdminComplaints'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminParking from './pages/admin/AdminParking'

// Super Admin Pages
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import SuperAdminCondominiums from './pages/superadmin/SuperAdminCondominiums'
import SuperAdminAdmins from './pages/superadmin/SuperAdminAdmins'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Routes with Role-Based Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <RoleBasedLayout />
              </ProtectedRoute>
            }>
              {/* Resident Routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="parking" element={<Parking />} />
              <Route path="utilities" element={<Utilities />} />
              <Route path="services" element={<Services />} />
              <Route path="ekub-eddir" element={<EkubEddir />} />

              {/* Admin Routes */}
              <Route path="admin-dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="admin/residents" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminResidents />
                </ProtectedRoute>
              } />
              <Route path="admin/complaints" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminComplaints />
                </ProtectedRoute>
              } />
              <Route path="admin/announcements" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminAnnouncements />
                </ProtectedRoute>
              } />
              <Route path="admin/parking" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminParking />
                </ProtectedRoute>
              } />

              {/* Super Admin Routes */}
              <Route path="super-admin-dashboard" element={
                <ProtectedRoute requiredRole="super_admin">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="super-admin/condominiums" element={
                <ProtectedRoute requiredRole="super_admin">
                  <SuperAdminCondominiums />
                </ProtectedRoute>
              } />
              <Route path="super-admin/admins" element={
                <ProtectedRoute requiredRole="super_admin">
                  <SuperAdminAdmins />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  )
}

export default App