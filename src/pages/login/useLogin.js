import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useLogin = () => {
    
    const [payload, setPayload] = useState({})

    const {login} = useAuth()

    const onChangeHandler= (e)=>{
        setPayload({...payload,[e.target.name]:e.target.value})
    }
    
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            let res = await axiosInstance.post("/login", payload)
            if (res.status===200){
                login(res.data.data.AccessToken, JSON.stringify(res.data.data.TokenModel) )
            } else {
                // insert notif
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }       
    }

    const loginGoogleHandler = async (code) => {

        const options = {
            code: code,
          };

          const qs = new URLSearchParams(options);
          try {
            const res = await axiosInstance
            .get(`/sessions/oauth?${qs.toString()}`)
            if (res.status===200){
                login(res.data.data.AccessToken, JSON.stringify(res.data.data.TokenModel)) 
            }
          } catch (err) {
            if(err.response){    
                toast.error(err.response.data.status.description)
            } else
            toast(err.message);
          }
    }
    return {
        payload,
        loginHandler,
        loginGoogleHandler,
        onChangeHandler
    }
}

export default useLogin