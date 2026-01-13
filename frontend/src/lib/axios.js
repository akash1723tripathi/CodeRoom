import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  // withCredentials: true, // <--- Make sure this is commented out or deleted!
});

export default axiosInstance;