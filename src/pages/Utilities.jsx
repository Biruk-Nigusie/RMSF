import { useState, useEffect } from 'react'
import { utilitiesAPI } from '../services/api'
import { toast } from 'react-toastify'
import { Zap, Droplets, CreditCard, AlertTriangle } from 'lucide-react'

const Utilities = () => {
  const [utilities, setUtilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [reportData, setReportData] = useState({
    type: 'electricity',
    description: '',
    priority: 'medium'
  })

  useEffect(() => {
    fetchUtilities()
  }, [])

  const fetchUtilities = async () => {
    try {
      const response = await utilitiesAPI.getAll()
      setUtilities(response.data)
    } catch (error) {
      toast.error('Failed to fetch utilities')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (billId) => {
    try {
      await utilitiesAPI.pay(billId, { paymentMethod: 'online' })
      toast.success('Payment successful!')
      setShowPayment(false)
      setSelectedBill(null)
      fetchUtilities()
    } catch (error) {
      toast.error('Payment failed')
    }
  }

  const handleReportIssue = async (e) => {
    e.preventDefault()
    try {
      await utilitiesAPI.reportIssue(reportData)
      toast.success('Issue reported successfully!')
      setShowReport(false)
      setReportData({ type: 'electricity', description: '', priority: 'medium' })
    } catch (error) {
      toast.error('Failed to report issue')
    }
  }

  const handleReportChange = (e) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value
    })
  }

  const getUtilityIcon = (type) => {
    switch (type) {
      case 'electricity': return <Zap className="text-yellow-500" size={24} />
      case 'water': return <Droplets className="text-blue-500" size={24} />
      default: return <Zap className="text-gray-500" size={24} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-blue">Utilities</h1>
        <button
          onClick={() => setShowReport(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <AlertTriangle size={20} />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Report Issue Form */}
      {showReport && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">Report Utility Issue</h2>
          <form onSubmit={handleReportIssue}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utility Type
                </label>
                <select
                  name="type"
                  value={reportData.type}
                  onChange={handleReportChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="electricity">Electricity</option>
                  <option value="water">Water</option>
                  <option value="gas">Gas</option>
                  <option value="internet">Internet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={reportData.priority}
                  onChange={handleReportChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={reportData.description}
                onChange={handleReportChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                placeholder="Describe the issue in detail..."
                required
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Report Issue
              </button>
              <button
                type="button"
                onClick={() => setShowReport(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Utility Bills */}
      <div className="grid gap-6">
        {utilities.length > 0 ? (
          utilities.map((utility) => (
            <div key={utility.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getUtilityIcon(utility.type)}
                  <div>
                    <h3 className="text-xl font-semibold text-dark-blue">
                      {utility.type?.charAt(0).toUpperCase() + utility.type?.slice(1)} Bill
                    </h3>
                    <p className="text-gray-600">
                      {new Date(utility.billingPeriod).toLocaleDateString()} - 
                      {new Date(utility.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-dark-blue">
                    ${utility.amount}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(utility.status)}`}>
                    {utility.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Usage</p>
                  <p className="text-lg font-semibold text-dark-blue">
                    {utility.usage} {utility.type === 'electricity' ? 'kWh' : 'gallons'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rate</p>
                  <p className="text-lg font-semibold text-dark-blue">
                    ${utility.rate} per {utility.type === 'electricity' ? 'kWh' : 'gallon'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="text-lg font-semibold text-dark-blue">
                    {new Date(utility.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {utility.status !== 'paid' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handlePayment(utility.id)}
                    className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <CreditCard size={20} />
                    <span>Pay Now</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                No Utility Bills
              </h3>
              <p className="text-gray-500">
                Your utility bills will appear here when available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Utilities