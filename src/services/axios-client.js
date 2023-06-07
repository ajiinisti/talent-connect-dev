import axios from "axios"
import { useAuth } from "../hooks/useAuth";
const axiosInstance = axios.create({
    baseURL: "/api",
  });

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(res => {
    const {logout} = useAuth()
    if (res.status === 401){
        logout()
    }
  },
  res => {
    throw res;
  });

export default  axiosInstance
