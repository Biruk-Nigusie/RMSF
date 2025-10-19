import { useEffect, useState } from 'react'
import { dashboardAPI } from '../services/api'
import { Users, AlertCircle, CheckCircle, DollarSign } from 'lucide-react'

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardAPI.getAdmin()
        setDashboardData(response.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

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
          Admin Dashboard
        </h1>
        <p className="text-teal text-sm sm:text-base">Condominium management overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Total Residents</h3>
            <Users className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalResidents || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Registered residents</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Total Complaints</h3>
            <AlertCircle className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalComplaints || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">All complaints</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Pending</h3>
            <CheckCircle className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.pendingComplaints || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Need attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-teal">Revenue</h3>
            <DollarSign className="text-medium-green" size={20} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-dark-blue">
            ${dashboardData?.stats?.totalRevenue || 0}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Total collected</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-teal mb-4">Recent Complaints</h3>
        <div className="space-y-3">
          {dashboardData?.recentComplaints?.length > 0 ? (
            dashboardData.recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100 gap-2 sm:gap-0">
                <div className="flex-1">
                  <p className="font-medium text-dark-blue text-sm sm:text-base">{complaint.description}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {complaint.resident.fullName} - Block {complaint.resident.block}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:text-right gap-2 sm:gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    complaint.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                    complaint.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                  <p className="text-xs text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">No recent complaints</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard