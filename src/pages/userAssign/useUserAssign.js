import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useUserAssign = () => {
    const [programs, setProgram] = useState([])

    const getPrograms = async () => {
        try {
            let res = await axiosInstance.get(`/programs`)
            if (res.status === 200) {
                setProgram(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        programs,
        getPrograms
    }
}

export default useUserAssign