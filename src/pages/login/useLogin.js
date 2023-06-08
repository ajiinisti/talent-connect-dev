import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import axiosInstance from "../../services/axios-client"

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
            if (res.status == 200){
                login(res.data.data.AccessToken, JSON.stringify(res.data.data.TokenModel) )
            } else {
                // insert notif
            }
        } catch (error) {
        }
            
    }
    return {
        payload,
        loginHandler,
        onChangeHandler
    }
}

export default useLogin