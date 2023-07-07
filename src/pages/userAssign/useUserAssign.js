import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useUserAssign = () => {
    const [programs, setProgram] = useState([])
    const [user, setUser] = useState({})

    const getUser = async (id) => {
        try {
            let res = await axiosInstance.get(`users/${id}`)
            if (res.status === 200) {
                setUser(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

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
        user,
        getPrograms,
        getUser
    }
}

export default useUserAssign