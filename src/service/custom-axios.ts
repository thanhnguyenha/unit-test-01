import axios, { AxiosInstance, AxiosError } from 'axios';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_ACCESTOKEN}`,
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // if (globalThis.window !== undefined) {
    //   const user = localStorage.getItem('user');
    //   if (user) {
    //     try {
    //       // const userData = JSON.parse(user);
    //       // Add token to headers if needed
    //       // config.headers.Authorization = `Bearer ${userData.token}`;
    //     } catch (error) {
    //       console.error('Error parsing user data:', error);
    //     }
    //   }
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear user data and redirect to login
          // if (globalThis.window !== undefined) {
          //   localStorage.removeItem('user');
          //   globalThis.window.location.href = '/login';
          // }
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('Not Found: The requested resource was not found');
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server');
          break;
        default:
          console.error('Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error: No response received from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
  
);

export default axiosInstance;
