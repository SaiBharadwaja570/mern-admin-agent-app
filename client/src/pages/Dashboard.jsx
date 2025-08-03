// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Users, Upload, FolderOpen } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

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
    },
    {
      title: "View Uploaded Lists",
      description: "Access uploaded content",
      icon: FolderOpen,
      path: '/uploaded-lists',
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage agents and tasks efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
