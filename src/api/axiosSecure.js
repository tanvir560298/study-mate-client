import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://study-mate-server-rho.vercel.app",
  withCredentials: true,
});

export default axiosSecure;
