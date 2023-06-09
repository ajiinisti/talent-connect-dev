import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useActivityDetail = () => {

    const [activity, setActivity] = useState({})
    
    const getDetail = async (id) => {
        try {
            let res = await axiosInstance.get("activities/"+id)
            if (res.status === 200) {
                setActivity(res.data.data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    return {
        activity,
        getDetail
    }
}

export default useActivityDetail