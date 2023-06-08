import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useActivityList = () => {
    const [programs, setPrograms] = useState({})
    const [activities, setActivities] = useState({})
    
    const getPrograms = async (id) => {
        try{
            let res = await axiosInstance.get(`/programs/${id}`)
            if (res.status === 200) {
                setPrograms(res.data.data.Program)
                setActivities(res.data.data.Activity)
            }
        } catch(e) {
            console.log(e);
        }
    }
    return {
        getPrograms,
        programs,
        activities
    }
}

export default useActivityList