import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useEvaluateParticipant = () => {
    
    const [data, setData] = useState({})
    const getEvaluation = async (id) => {
        try {
            let res = await axiosInstance.get("/auth/evaluation/program/"+id)
            if(res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getEvaluation, 
        data
    }
}

export default useEvaluateParticipant