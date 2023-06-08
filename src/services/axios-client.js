import axios from "axios"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "/api",
});
const AxiosInterceptor = ({ children }) => {

    const navigate = useNavigate();
    const {logout} = useAuth()
    const [isSet, setIsSet] = useState(false)

    useEffect(() => {

        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = error => {

            if (error.response.status === 401) {
                logout()
                toast.error("Login expired",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"})
                return Promise.resolve(error)
            }

            return Promise.reject(error);
        }


        const ResInterceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);
        const ReqInterceptor = axiosInstance.interceptors.request.use((config) => {
          const token = localStorage.getItem('token')
          if (token) {
              config.headers["Authorization"] = `Bearer ${token}`
          }
          return config
      })
      
    setIsSet(true)

        return () => axiosInstance.interceptors.response.eject(ResInterceptor, ReqInterceptor);

    }, [navigate, logout])

    return isSet && children
}

export default axiosInstance;
export { AxiosInterceptor }
