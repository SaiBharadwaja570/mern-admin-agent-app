// src/pages/AgentsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  const BasicNavbarExample = () => {
  const basicLinks = [
    { label: "Dashboard", href: "/dashboard"},
    { label: "Add Agents", href: "/add-agent" },
    { label: "Upload Files", href: "/upload-list" },
    { label: "Uploaded Files", href: "/uploaded-lists" }
  ];

  return (
    <Navbar
      brand="MyCompany"
      links={basicLinks}
      variant="default"
    />
  );
};

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('/agents/with-tasks');
        setAgents(res.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-6">Agents and Tasks</h2>

        <div className="space-y-6">
          {agents.map((agent) => (
            <div key={agent._id} className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
              <p className="text-sm text-gray-600">{agent.email}</p>

              <div className="mt-4 space-y-2">
                {agent.tasks.length === 0 ? (
                  <p className="text-sm text-gray-400">No tasks assigned</p>
                ) : (
                  agent.tasks.map((task) => (
                    <div key={task._id} className="bg-gray-50 p-3 rounded-md border">
                      <p className="text-gray-800 font-medium">{task.firstName}</p>
                      <p className="text-gray-600 text-sm">Phone: {task.phone}</p>
                      {task.notes && <p className="text-gray-500 text-sm">Notes: {task.notes}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsList;
