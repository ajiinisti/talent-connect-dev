import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useUserAssign = () => {
    const [programs, setProgram] = useState([])

    const getPrograms = async () => {
        try {
            let res = await axiosInstance.get(`/programs`)
            if (res.status === 200) {
                setProgram(res.data.data)
            }
        } catch (error) {
            
        }
    }

    return {
        programs,
        getPrograms
    }
}

export default useUserAssign