import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useProgram = () => {
    const [program, setProgram] = useState([])
    
    const getPrograms = async () => {
        try {
            let res = await axiosInstance.get("auth/programs")
            if (res.status === 200) {
                console.log(res.data.data)
                setProgram(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    const deleteProgram = async(id) => {
        try {
            let res = await axiosInstance.delete(`/programs/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    
    return {
        program,
        getPrograms,
        deleteProgram,
    }
}

export default useProgram