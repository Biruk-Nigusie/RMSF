const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-dark-blue mb-8">About RMS</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-teal text-lg mb-6">
          The Residential Management System (RMS) is a comprehensive solution designed to streamline property management operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Features</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Resident Management</li>
              <li>• Complaint Tracking</li>
              <li>• Financial Management</li>
              <li>• Announcements</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Benefits</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Streamlined Operations</li>
              <li>• Better Communication</li>
              <li>• Efficient Record Keeping</li>
              <li>• Enhanced User Experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About