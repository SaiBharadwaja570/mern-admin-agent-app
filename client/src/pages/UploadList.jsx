import { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, X, ArrowLeft, Sparkles } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance'

const UploadList = ({ onNavigate }) => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch all uploaded tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFileChange = (selectedFile) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (selectedFile && (allowedTypes.includes(selectedFile.type) || selectedFile.name.match(/\.(csv|xls|xlsx)$/i))) {
      setFile(selectedFile);
      setMsg('');
      setMsgType('');
    } else {
      setMsg('Please select a valid CSV or Excel file.');
      setMsgType('error');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg('Please select a file.');
      setMsgType('error');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post(`/upload/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setMsg('File uploaded successfully! Tasks assigned.');
      setMsgType('success');
      setFile(null);
      fetchTasks();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed.');
      setMsgType('error');
    } finally {
      setUploading(false);
    }
  };

  const getMessageIcon = () => {
    switch (msgType) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };

  const getMessageColor = () => {
    switch (msgType) {
      case 'success': return 'bg-emerald-50/80 backdrop-blur-sm border-emerald-200 text-emerald-800 shadow-sm';
      case 'error': return 'bg-red-50/80 backdrop-blur-sm border-red-200 text-red-800 shadow-sm';
      case 'info': return 'bg-blue-50/80 backdrop-blur-sm border-blue-200 text-blue-800 shadow-sm';
      default: return 'bg-gray-50/80 backdrop-blur-sm border-gray-200 text-gray-800 shadow-sm';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => onNavigate ? onNavigate('/dashboard') : window.location.href = '/dashboard'}
            className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 mb-8 hover:translate-x-1"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          {/* Upload Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8 mb-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upload Data</h1>
                <p className="text-gray-600 mt-1">Transform your CSV or Excel files into actionable tasks</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 transform hover:scale-[1.02] ${
                dragActive 
                  ? 'border-indigo-400 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm shadow-lg scale-[1.02]' :
                file 
                  ? 'border-emerald-400 bg-gradient-to-br from-emerald-50/80 to-cyan-50/80 backdrop-blur-sm shadow-lg' :
                  'border-gray-300 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-purple-50/50 hover:backdrop-blur-sm hover:shadow-md'
              }`}
              onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileChange(e.dataTransfer.files[0]); }}
            >
              {!file ? (
                <>
                  <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => handleFileChange(e.target.files[0])} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center group">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-700 mb-2">Drop your files here</span>
                    <span className="text-gray-500 text-sm">or click to browse • CSV, XLS, XLSX supported</span>
                  </label>
                </>
              ) : (
                <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-lg">{file.name}</p>
                      <p className="text-emerald-600 font-medium">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors duration-200 group"
                  >
                    <X className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                  </button>
                </div>
              )}
            </div>

            {file && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`mt-6 w-full px-6 py-4 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                  uploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                ) : (
                  'Upload & Process File'
                )}
              </button>
            )}

            {msg && (
              <div className={`mt-6 p-4 rounded-2xl border flex gap-3 animate-in slide-in-from-bottom-2 duration-500 ${getMessageColor()}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {getMessageIcon()}
                </div>
                <span className="font-medium">{msg}</span>
              </div>
            )}
          </div>

          {/* Tasks Table */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-500 hover:bg-white/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Uploaded Tasks</h2>
                <p className="text-gray-600">View and manage your processed data</p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">First Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200">
                    {tasks.length > 0 ? tasks.map((task, idx) => (
                      <tr key={task._id} className="hover:bg-white/80 transition-colors duration-200 hover:shadow-sm">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{idx + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{task.firstName}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{task.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{task.notes}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-4 bg-gray-100 rounded-2xl">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-lg font-medium text-gray-500">No tasks uploaded yet</p>
                              <p className="text-gray-400 text-sm">Upload a file to see your tasks here</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadList;