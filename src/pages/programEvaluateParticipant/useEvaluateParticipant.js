import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useEvaluateParticipant = () => {
    
    const [data, setData] = useState({})
    const getEvaluation = async (id) => {
        let res = await axiosInstance.get("/auth/evaluation/program/"+id)
        if(res.status === 200) {
            setData(res.data.data)
        }
    }
    return {
        getEvaluation, 
        data
    }
}

export default useEvaluateParticipant