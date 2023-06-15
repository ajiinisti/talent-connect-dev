import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useParticipantEvaluation = () => {
    const [data, setData] = useState({})
    
    const getParticipantEvaluation = async (id) => {
        try {
            let res = await axiosInstance.get("/participants/evaluation/"+id)
            if(res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        data,
        getParticipantEvaluation
    }

}

export default useParticipantEvaluation