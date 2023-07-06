import { useState } from "react"
import axiosInstance from "../../services/axios-client"

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
            console.log(error);
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