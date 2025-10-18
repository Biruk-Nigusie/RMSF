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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-2">
          Admin Dashboard
        </h1>
        <p className="text-teal">Condominium management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Total Residents</h3>
            <Users className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalResidents || 0}
          </p>
          <p className="text-gray-600">Registered residents</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Total Complaints</h3>
            <AlertCircle className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalComplaints || 0}
          </p>
          <p className="text-gray-600">All complaints</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Pending</h3>
            <CheckCircle className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.pendingComplaints || 0}
          </p>
          <p className="text-gray-600">Need attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Revenue</h3>
            <DollarSign className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            ${dashboardData?.stats?.totalRevenue || 0}
          </p>
          <p className="text-gray-600">Total collected</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-teal mb-4">Recent Complaints</h3>
        <div className="space-y-3">
          {dashboardData?.recentComplaints?.length > 0 ? (
            dashboardData.recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-dark-blue">{complaint.description}</p>
                  <p className="text-sm text-gray-600">
                    {complaint.resident.fullName} - Block {complaint.resident.block}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    complaint.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                    complaint.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent complaints</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard