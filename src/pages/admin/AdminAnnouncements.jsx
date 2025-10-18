import { useState, useEffect } from 'react'
import { announcementsAPI } from '../../services/api'
import { toast } from 'react-toastify'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'ALL'
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await announcementsAPI.getAll()
      setAnnouncements(response.data?.data || response.data || [])
    } catch (error) {
      toast.error('Failed to fetch announcements')
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await announcementsAPI.update(editingId, formData)
        toast.success('Announcement updated successfully')
      } else {
        await announcementsAPI.create(formData)
        toast.success('Announcement created successfully')
      }
      setShowForm(false)
      setEditingId(null)
      setFormData({ title: '', message: '', targetAudience: 'ALL' })
      fetchAnnouncements()
    } catch (error) {
      toast.error(editingId ? 'Failed to update announcement' : 'Failed to create announcement')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementsAPI.delete(id)
        toast.success('Announcement deleted successfully')
        fetchAnnouncements()
      } catch (error) {
        toast.error('Failed to delete announcement')
      }
    }
  }

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      targetAudience: announcement.targetAudience
    })
    setEditingId(announcement.id)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: '', message: '', targetAudience: 'ALL' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
        <h1 className="text-3xl font-bold text-dark-blue">Announcement Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-teal mb-4">
            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
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
                  Target Audience
                </label>
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
                >
                  <option value="ALL">All Residents</option>
                  <option value="BLOCK">Specific Block</option>
                  <option value="GROUP">Specific Group</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
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
                {editingId ? 'Update Announcement' : 'Create Announcement'}
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

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-dark-blue mb-2">
                  {announcement.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {announcement.targetAudience}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(announcement)}
                  className="text-green-600 hover:text-green-900"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(announcement.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{announcement.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminAnnouncements