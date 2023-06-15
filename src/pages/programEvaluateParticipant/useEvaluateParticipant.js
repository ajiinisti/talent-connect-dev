import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useEvaluateParticipant = () => {
    
    const [data, setData] = useState({})
    const getEvaluation = async (id) => {
        try {
            let res = await axiosInstance.get("/auth/evaluation/program/"+id)
            if(res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    return {
        getEvaluation, 
        data
    }
}

export default useEvaluateParticipant