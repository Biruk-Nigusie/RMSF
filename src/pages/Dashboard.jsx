import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dashboardAPI } from '../services/api'
import { Home, FileText, Car, Zap, AlertCircle, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = user?.role === 'admin' 
          ? await dashboardAPI.getAdmin()
          : await dashboardAPI.getResident()
        setDashboardData(response.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-teal text-sm sm:text-base">Here's what's happening in your community</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">My Complaints</h3>
            <AlertCircle className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.complaintsCount || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Active complaints</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Announcements</h3>
            <FileText className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.announcementsCount || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">New announcements</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Parking</h3>
            <Car className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.parkingSlot || 'N/A'}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Your parking slot</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Utilities</h3>
            <Zap className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            ${dashboardData?.pendingBills || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Pending bills</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Apartment</h3>
            <Home className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {user?.blockNumber}-{user?.apartmentNumber}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Your unit</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Balance</h3>
            <DollarSign className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            ${dashboardData?.balance || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Account balance</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-teal mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {dashboardData?.recentActivity?.length > 0 ? (
            dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-100 gap-1 sm:gap-0">
                <span className="text-gray-700 text-sm sm:text-base">{activity.description}</span>
                <span className="text-xs sm:text-sm text-gray-500">{activity.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard