import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Star, CreditCard, Phone, Mail } from 'lucide-react'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [paymentData, setPaymentData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      // Mock data for now
      setServices([
        {
          id: 1,
          name: 'Cleaning Service',
          serviceType: 'CLEANING',
          contact: '+1234567890',
          email: 'clean@service.com',
          feeMonthly: 25,
          rating: 4.5,
          description: 'Professional cleaning service for common areas'
        },
        {
          id: 2,
          name: 'Security Service',
          serviceType: 'SECURITY',
          contact: '+1234567891',
          email: 'security@service.com',
          feeMonthly: 50,
          rating: 4.8,
          description: '24/7 security monitoring and patrol'
        },
        {
          id: 3,
          name: 'Maintenance Service',
          serviceType: 'MAINTENANCE',
          contact: '+1234567892',
          email: 'maintenance@service.com',
          feeMonthly: 30,
          rating: 4.2,
          description: 'General maintenance and repair services'
        }
      ])
    } catch (error) {
      toast.error('Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      // Mock API call
      toast.success('Payment successful!')
      setShowPayment(false)
      setSelectedService(null)
    } catch (error) {
      toast.error('Payment failed')
    }
  }

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))
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
      <h1 className="text-3xl font-bold text-dark-blue mb-8">Community Services</h1>

      {/* Payment Form */}
      {showPayment && selectedService && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            Pay for {selectedService.name}
          </h2>
          <form onSubmit={handlePayment}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={selectedService.feeMonthly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  name="month"
                  value={paymentData.month}
                  onChange={handlePaymentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  name="year"
                  value={paymentData.year}
                  onChange={handlePaymentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                  <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                Pay Now
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPayment(false)
                  setSelectedService(null)
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-dark-blue">{service.name}</h3>
              <span className="bg-medium-green text-white px-2 py-1 rounded-full text-sm">
                {service.serviceType}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{service.description}</p>

            <div className="flex items-center space-x-1 mb-4">
              {renderStars(service.rating)}
              <span className="text-sm text-gray-600 ml-2">({service.rating})</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{service.contact}</span>
              </div>
              {service.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{service.email}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Monthly Fee</p>
                <p className="text-2xl font-bold text-dark-blue">${service.feeMonthly}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedService(service)
                  setShowPayment(true)
                }}
                className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <CreditCard size={16} />
                <span>Pay</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              No Services Available
            </h3>
            <p className="text-gray-500">
              Community services will be listed here when available.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services