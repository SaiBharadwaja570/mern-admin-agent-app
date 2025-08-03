import axios from 'axios'

// Create an axios instance with base URL from environment variable
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Add a request interceptor to include auth token if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axiosInstance
