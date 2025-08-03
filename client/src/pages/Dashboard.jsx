import React from 'react';
import { UserPlus, Users, Upload, FolderOpen, LogOut, User } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

// Page which will open after login
// User can perform navigation

const Dashboard = ({ onNavigate, onLogout }) => {

  const dashboardItems = [
    {
      title: "Add Agent",
      description: "Create a new agent account",
      icon: UserPlus,
      path: '/add-agent',
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "View Agents",
      description: "List of all agents and their tasks",
      icon: Users,
      path: '/agents',
      color: "from-green-500 to-green-600"
    },
    {
      title: "Upload List",
      description: "Upload tasks or data for agents",
      icon: Upload,
      path: '/upload-list',
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // logout logic
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Welcome, Admin</h2>
              <p className="text-sm text-gray-600">Manage your team and tasks</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage agents and tasks efficiently</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">{item.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;