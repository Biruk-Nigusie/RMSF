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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue dark:text-white mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-teal dark:text-medium-green">Here's what's happening in your community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">My Complaints</h3>
            <AlertCircle className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            {dashboardData?.complaintsCount || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Active complaints</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">Announcements</h3>
            <FileText className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            {dashboardData?.announcementsCount || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">New announcements</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">Parking</h3>
            <Car className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            {dashboardData?.parkingSlot || 'N/A'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Your parking slot</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">Utilities</h3>
            <Zap className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            ${dashboardData?.pendingBills || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Pending bills</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">Apartment</h3>
            <Home className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            {user?.blockNumber}-{user?.apartmentNumber}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Your unit</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal dark:text-medium-green">Balance</h3>
            <DollarSign className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue dark:text-white">
            ${dashboardData?.balance || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Account balance</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-teal dark:text-medium-green mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {dashboardData?.recentActivity?.length > 0 ? (
            dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">{activity.description}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard