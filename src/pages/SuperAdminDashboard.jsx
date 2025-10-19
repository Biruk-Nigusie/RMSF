import { useEffect, useState } from "react";
import { dashboardAPI } from "../services/api";
import { Building, Users, Shield, Activity } from "lucide-react";

const SuperAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-teal">Residents</h3>
            <Users className="text-medium-green" size={24} />
          </div>
          <p className="text-2xl font-bold text-dark-blue">
            {dashboardData?.stats?.totalResidents || 0}
          </p>
          <p className="text-gray-600">Total residents</p>
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
    </div>
  );
};

export default SuperAdminDashboard;
