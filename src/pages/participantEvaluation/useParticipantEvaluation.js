import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useParticipantEvaluation = () => {
    const [data, setData] = useState({})
    
    const getParticipantEvaluation = async (id) => {
        let res = await axiosInstance.get("/participants/evaluation/"+id)
        if(res.status === 200) {
            setData(res.data.data)
        }
    }

    return {
        data,
        getParticipantEvaluation
    }

}

export default useParticipantEvaluation