import { useState, useEffect } from 'react'
import { announcementsAPI } from '../services/api'
import { toast } from 'react-toastify'
import { Calendar, User } from 'lucide-react'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue mb-8">Community Announcements</h1>

      <div className="space-y-6">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-dark-blue">
                  {announcement.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{announcement.author?.firstName} {announcement.author?.lastName}</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {announcement.message || announcement.content}
                </p>
              </div>

              {announcement.priority === 'high' && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <span className="text-red-800 font-medium">🚨 High Priority Announcement</span>
                </div>
              )}

              {announcement.category && (
                <div className="mt-4">
                  <span className="inline-block bg-medium-green text-white px-3 py-1 rounded-full text-sm">
                    {announcement.category}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                No Announcements Yet
              </h3>
              <p className="text-gray-500">
                Check back later for community updates and important notices.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Announcements