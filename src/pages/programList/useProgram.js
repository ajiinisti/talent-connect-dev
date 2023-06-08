import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useProgram = () => {
    const [program, setProgram] = useState([])
    
    const getPrograms = async () => {
        try {
            let res = await axiosInstance.get("auth/programs")
            if (res.status === 200) {
              setProgram(res.data.data)
            }
        } catch (error) {
            
        }
    }
    
    return {
        program,
        getPrograms,
    }
}

export default useProgram