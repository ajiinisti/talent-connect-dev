import { useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "../../services/axios-client"

const useEvaluateScore = () => {
    const [payload,setPayload] = useState({
        name: '',
        program_name: '',
        evaluation_stages: [],
    })

    const getScore = async (evalId, programId) => {
        try {
            const res = await axiosInstance.get(`evaluation/score/${evalId}/${programId}`)
            setPayload(res.data.data)
        } catch (error) {
            if (error.response)
                toast.error(error.response.data.status.description)
            else toast.error(error.message)
        }
    }

    return {
        payload,
        getScore
    }
}

export default useEvaluateScore