import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, ShoppingBag, DollarSign,
  Settings, BarChart2, Calendar
} from 'lucide-react';
import axios from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-indigo-600">TOOB Admin</h1>
          </div>
          <nav className="mt-8">
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-indigo-50 border-r-4 border-indigo-600">
              <BarChart2 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Package className="w-5 h-5 mr-3" />
              Products
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Users className="w-5 h-5 mr-3" />
              Users
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <ShoppingBag className="w-5 h-5 mr-3" />
              Orders
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Total Users</h3>
                  <p className="text-2xl font-semibold text-gray-700">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Total Products</h3>
                  <p className="text-2xl font-semibold text-gray-700">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Total Orders</h3>
                  <p className="text-2xl font-semibold text-gray-700">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-pink-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-pink-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                  <p className="text-2xl font-semibold text-gray-700">${stats.revenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">New order received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">New user registered</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Product stock updated</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;