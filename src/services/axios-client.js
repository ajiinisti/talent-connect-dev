import axios from "axios"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'

const instance = axios.create({
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
            }

            return Promise.reject(error);
        }


        const ResInterceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);
        const ReqInterceptor = instance.interceptors.request.use((config) => {
          const token = localStorage.getItem('token')
          if (token) {
              config.headers["Authorization"] = `Bearer ${token}`
          }
          return config
      })
      
    setIsSet(true)

        return () => instance.interceptors.response.eject(ResInterceptor, ReqInterceptor);

    }, [navigate])

    return isSet && children
}

export default instance;
export { AxiosInterceptor }
