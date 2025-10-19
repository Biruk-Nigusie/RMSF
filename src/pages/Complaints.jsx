import { useState, useEffect } from 'react'
import { complaintsAPI } from '../services/api'
import { toast } from 'react-toastify'
import { Plus, Edit, Trash2 } from 'lucide-react'

const Complaints = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium'
  })

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await complaintsAPI.getMy()
      console.log('Complaints response:', response)
      setComplaints(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Failed to fetch complaints:', error)
      setComplaints([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await complaintsAPI.update(editingId, formData)
        toast.success('Complaint updated successfully')
      } else {
        await complaintsAPI.create(formData)
        toast.success('Complaint submitted successfully')
      }
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: '', description: '', category: 'maintenance', priority: 'medium' })
      fetchComplaints()
    } catch (error) {
      toast.error(editingId ? 'Failed to update complaint' : 'Failed to submit complaint')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEdit = (complaint) => {
    const title = complaint.description?.split(':')[0] || ''
    const description = complaint.description?.includes(':') 
      ? complaint.description.split(':').slice(1).join(':').trim()
      : complaint.description
    
    setFormData({
      title,
      description,
      category: complaint.category?.toLowerCase() || 'maintenance',
      priority: 'medium'
    })
    setEditingId(complaint.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await complaintsAPI.delete(id)
        toast.success('Complaint deleted successfully')
        fetchComplaints()
      } catch (error) {
        toast.error('Failed to delete complaint')
      }
    }
  }

  const handleCancelEdit = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: '', description: '', category: 'maintenance', priority: 'medium' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-800'
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
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
        <h1 className="text-3xl font-bold text-dark-blue">My Complaints</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>New Complaint</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sms p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            {editingId ? 'Edit Complaint' : 'Submit New Complaint'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="noise">Noise</option>
                  <option value="security">Security</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="parking">Parking</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                required
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
              >
                {editingId ? 'Update Complaint' : 'Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-dark-blue mb-2">
                    {complaint.description?.split(':')[0] || 'Complaint'}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status?.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {complaint.category?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                  {complaint.status === 'OPEN' && (
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(complaint)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit complaint"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(complaint.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete complaint"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                {complaint.description?.includes(':') 
                  ? complaint.description.split(':').slice(1).join(':').trim()
                  : complaint.description
                }
              </p>
              
              {complaint.response && (
                <div className="bg-light-green p-4 rounded-lg">
                  <h4 className="font-semibold text-teal mb-2">Admin Response:</h4>
                  <p className="text-gray-700">{complaint.response}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No complaints submitted yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
            >
              Submit Your First Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Complaints