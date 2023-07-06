import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useEvaluateParticipant = () => {
    
    const [data, setData] = useState({})
    const [program, setProgram] = useState("")

    const getProgram = async (programId) => {
        try {
            let res = await axiosInstance.get("/programs/"+programId)
            const data = res.data.data
            setProgram(data.Program.Name)
        } catch (error) {
            
        }
    }

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
        getProgram,
        data,
        program
    }
}

export default useEvaluateParticipant