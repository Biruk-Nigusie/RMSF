import { useEffect, useState } from "react";
import { dashboardAPI } from "../services/api";
import api from "../services/api";
import { Building, Users, Shield, Activity, X } from "lucide-react";

const SuperAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResidentsModal, setShowResidentsModal] = useState(false);
  const [residentsPerBlock, setResidentsPerBlock] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardAPI.getSuper();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    fetchResidentsData();
  }, []);

  const fetchResidentsData = async () => {
    try {
      const response = await api.get('/residents');
      const residents = response.data?.data || [];
      
      // Group residents by block
      const blockCounts = residents.reduce((acc, resident) => {
        const block = resident.block || 'Unknown';
        acc[block] = (acc[block] || 0) + 1;
        return acc;
      }, {});
      
      const blockData = Object.entries(blockCounts).map(([block, count]) => ({
        block,
        count
      }));
      
      setResidentsPerBlock(blockData);
    } catch (error) {
      console.error('Failed to fetch residents data:', error);
    }
  };

  const handleResidentsClick = () => {
    setShowResidentsModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-teal">System-wide overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Condominiums</h3>
            <Building className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalCondominiums || 0}
          </p>
          <p className="text-gray-600">Total properties</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Admins</h3>
            <Shield className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalAdmins || 0}
          </p>
          <p className="text-gray-600">System administrators</p>
        </div>

        <div 
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleResidentsClick}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Residents</h3>
            <Users className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {residentsPerBlock.reduce((sum, block) => sum + block.count, 0)}
          </p>
          <p className="text-gray-600">Total residents (click to view by block)</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Audit Logs</h3>
            <Activity className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalAuditLogs || 0}
          </p>
          <p className="text-gray-600">System activities</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-teal mb-4">
          Condominium Statistics
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-light-green">
                <th className="px-4 py-2 text-left text-dark-blue">Name</th>
                <th className="px-4 py-2 text-left text-dark-blue">Location</th>
                <th className="px-4 py-2 text-left text-dark-blue">
                  Total Blocks
                </th>
                <th className="px-4 py-2 text-left text-dark-blue">
                  Residents
                </th>
                <th className="px-4 py-2 text-left text-dark-blue">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.condominiumStats?.map((condo) => (
                <tr key={condo.id} className="border-b border-gray-100">
                  <td className="px-4 py-2 font-medium">{condo.name}</td>
                  <td className="px-4 py-2">{condo.location}</td>
                  <td className="px-4 py-2">{condo.totalBlocks}</td>
                  <td className="px-4 py-2">{condo._count.residents}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Residents Modal */}
      {showResidentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-dark-blue">Residents per Block</h3>
              <button 
                onClick={() => setShowResidentsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              {residentsPerBlock.map((block) => (
                <div key={block.block} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Block {block.block}</span>
                  <span className="text-lg font-bold text-dark-blue">{block.count}</span>
                </div>
              ))}
              {residentsPerBlock.length === 0 && (
                <p className="text-gray-500 text-center py-4">No residents found</p>
              )}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Residents:</span>
                <span className="text-xl font-bold text-dark-blue">
                  {residentsPerBlock.reduce((sum, block) => sum + block.count, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
