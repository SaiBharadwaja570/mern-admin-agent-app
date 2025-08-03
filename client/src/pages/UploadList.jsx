import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, X, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const UploadList = ({ onNavigate }) => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); 
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (allowedTypes.includes(selectedFile.type) || selectedFile.name.match(/\.(csv|xls|xlsx)$/i)) {
        setFile(selectedFile);
        setMsg('');
        setMsgType('');
      } else {
        setMsg('Please select a valid CSV or Excel file.');
        setMsgType('error');
        setFile(null);
      }
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
      // Replace with your actual axios call
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Mock successful upload for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMsg('File uploaded successfully! Data has been processed and tasks assigned.');
      setMsgType('success');
      setFile(null);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed. Please try again.');
      setMsgType('error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setMsg('');
    setMsgType('');
  };

  const getMessageIcon = () => {
    switch (msgType) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getMessageColor = () => {
    switch (msgType) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => onNavigate ? onNavigate('/dashboard') : window.location.href = '/dashboard'}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Data</h1>
            <p className="text-gray-600">Upload CSV or Excel files to assign tasks to agents</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : file
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dragActive ? 'Drop your file here' : 'Upload your file'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your CSV or Excel file here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose File
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported formats: CSV, XLS, XLSX (Max size: 10MB)
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Upload Button */}
            {file && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`inline-flex items-center gap-2 px-8 py-3 font-medium rounded-lg transition-all ${
                    uploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 hover:scale-105'
                  } text-white`}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload File
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Message Display */}
            {msg && (
              <div className={`mt-6 p-4 rounded-lg border flex items-start gap-3 ${getMessageColor()}`}>
                {getMessageIcon()}
                <p className="flex-1">{msg}</p>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-3">Upload Instructions</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">File Requirements:</h5>
                <ul className="space-y-1">
                  <li>• CSV, XLS, or XLSX format</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• UTF-8 encoding recommended</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Expected Columns:</h5>
                <ul className="space-y-1">
                  <li>• Agent Name or ID</li>
                  <li>• Task Title</li>
                  <li>• Task Description</li>
                  <li>• Priority Level</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadList;