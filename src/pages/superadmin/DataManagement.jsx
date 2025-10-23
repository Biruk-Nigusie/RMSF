import { useState } from "react";
import { toast } from "react-toastify";
import { Database, Download, Upload, Trash2, AlertTriangle } from "lucide-react";
import api from "../../services/api";

const DataManagement = () => {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const exportData = async (type) => {
    setLoading(true);
    try {
      const response = await api.get(`/data/export/${type}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_export.json`;
      a.click();
      
      toast.success(`${type} data exported successfully`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(`Failed to export ${type} data`);
    } finally {
      setLoading(false);
    }
  };

  const importData = async (type, file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await api.post(`/data/import/${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success(`${type} data imported successfully`);
    } catch (error) {
      console.error('Import failed:', error);
      toast.error(`Failed to import ${type} data`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      importData(type, file);
    }
  };

  const deleteAllData = async (type) => {
    setLoading(true);
    try {
      await api.delete(`/data/delete/${type}`);
      toast.success(`All ${type} data deleted successfully`);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error(`Failed to delete ${type} data`);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (type) => {
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const dataTypes = [
    { key: 'residents', label: 'Residents', icon: '👥' },
    { key: 'admins', label: 'Admins', icon: '🛡️' },
    { key: 'condominiums', label: 'Condominiums', icon: '🏢' },
    { key: 'complaints', label: 'Complaints', icon: '📝' },
    { key: 'announcements', label: 'Announcements', icon: '📢' },
    { key: 'parking', label: 'Parking', icon: '🚗' },
    { key: 'utilities', label: 'Utilities', icon: '⚡' },
    { key: 'audit_logs', label: 'Audit Logs', icon: '📊' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-2">Data Management</h1>
        <p className="text-teal">Export, import, and manage system data</p>
      </div>

      {/* Data Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataTypes.map((type) => (
          <div key={type.key} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{type.icon}</span>
              <h3 className="text-xl font-semibold text-dark-blue">{type.label}</h3>
            </div>
            
            <div className="space-y-3">
              {/* Export */}
              <button
                onClick={() => exportData(type.key)}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                <span>Export</span>
              </button>

              {/* Import */}
              <label className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                <Upload size={16} />
                <span>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(type.key, e)}
                  className="hidden"
                />
              </label>

              {/* Delete All */}
              <button
                onClick={() => confirmDelete(type.key)}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} />
                <span>Delete All</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Operations */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-teal mb-4 flex items-center">
          <Database size={20} className="mr-2" />
          System Operations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => exportData('full_backup')}
            disabled={loading}
            className="bg-medium-green hover:bg-teal text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <Download size={20} />
            <span>Full System Backup</span>
          </button>

          <label className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
            <Upload size={20} />
            <span>Restore System</span>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload('full_restore', e)}
              className="hidden"
            />
          </label>

          <button
            onClick={() => confirmDelete('all_data')}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <AlertTriangle size={20} />
            <span>Reset System</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-dark-blue">Confirm Deletion</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete all {deleteType.replace('_', ' ')} data? 
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => deleteAllData(deleteType)}
                disabled={loading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;