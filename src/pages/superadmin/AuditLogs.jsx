import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Activity, Filter, Download } from "lucide-react";
import api from "../../services/api";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    actorType: "",
    action: "",
    targetTable: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/audit");
      setLogs(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      toast.error("Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    fetchLogs();
  };

  const exportLogs = () => {
    const csv = [
      ["Timestamp", "Actor Type", "Action", "Target Table", "IP Address"],
      ...logs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.actorType,
        log.action,
        log.targetTable,
        log.ipAddress || "N/A"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-blue">Audit Logs</h1>
        <button
          onClick={exportLogs}
          className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-teal mb-4 flex items-center">
          <Filter size={20} className="mr-2" />
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            name="actorType"
            value={filters.actorType}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
          >
            <option value="">All Actor Types</option>
            <option value="ADMIN">Admin</option>
            <option value="RESIDENT">Resident</option>
          </select>
          <input
            type="text"
            name="action"
            value={filters.action}
            onChange={handleFilterChange}
            placeholder="Action"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
          />
          <input
            type="text"
            name="targetTable"
            value={filters.targetTable}
            onChange={handleFilterChange}
            placeholder="Target Table"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
          />
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medium-green"
          />
          <button
            onClick={applyFilters}
            className="bg-medium-green hover:bg-teal text-white px-4 py-2 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-light-green">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-blue uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Activity size={16} className="text-medium-green mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {log.actorType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.targetTable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress || "N/A"}
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

export default AuditLogs;