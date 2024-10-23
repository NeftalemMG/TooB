import React from 'react';
import { DollarSign, Users, Package, ShoppingBag } from 'lucide-react';

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;