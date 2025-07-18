import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    tasks: 0,
    deployments: 0,
    successRate: 0
  });

  const [healthStatus, setHealthStatus] = useState({
    frontend: 'online',
    backend: 'online',
    database: 'connected'
  });

  const [recentDeployments, setRecentDeployments] = useState([
    {
      id: 1,
      version: 'v1.0.3',
      date: '2023-07-15',
      status: 'success',
      environment: 'production'
    },
    {
      id: 2,
      version: 'v1.0.2',
      date: '2023-07-10',
      status: 'success',
      environment: 'staging'
    },
    {
      id: 3,
      version: 'v1.0.1',
      date: '2023-07-05',
      status: 'failed',
      environment: 'development'
    }
  ]);

  useEffect(() => {
    // In a real application, this would fetch data from our backend API
    // For now, we'll simulate loading data
    const loadDashboardData = async () => {
      try {
        // Simulating API call with timeout
        setTimeout(() => {
          setStats({
            users: 124,
            tasks: 567,
            deployments: 38,
            successRate: 94.7
          });
        }, 1000);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Deployment Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 12% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Tasks</h3>
          <p className="text-3xl font-bold">{stats.tasks}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 8% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Deployments</h3>
          <p className="text-3xl font-bold">{stats.deployments}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 4% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Success Rate</h3>
          <p className="text-3xl font-bold">{stats.successRate}%</p>
          <div className="mt-2 text-green-600 text-sm">↑ 2% from last month</div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-md mb-10">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  healthStatus.frontend === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>Frontend Application</span>
              </div>
              <span className="text-sm capitalize font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {healthStatus.frontend}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  healthStatus.backend === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>Backend API</span>
              </div>
              <span className="text-sm capitalize font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {healthStatus.backend}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  healthStatus.database === 'connected' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>MongoDB Database</span>
              </div>
              <span className="text-sm capitalize font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {healthStatus.database}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deployments */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Recent Deployments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Environment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeployments.map((deployment) => (
                  <tr key={deployment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {deployment.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deployment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deployment.environment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        deployment.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {deployment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;