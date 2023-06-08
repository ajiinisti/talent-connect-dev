import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useActivityDetail = () => {

    const [activity, setActivity] = useState({})
    
    const getDetail = async (id) => {
        try {
            let res = await axiosInstance.get("activities/"+id)
            if (res.status === 200) {
                setActivity(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {
        activity,
        getDetail
    }
}

export default useActivityDetail