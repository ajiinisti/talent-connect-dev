import { useState } from "react"
import moment from "moment"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useActivityList = () => {
    const [programs, setPrograms] = useState({})
    const [activities, setActivities] = useState([])
    const [mentoring, setMentoring] = useState([])
    
    const getPrograms = async (id) => {
        try{
            let res = await axiosInstance.get(`/programs/${id}`)
            console.log(res.data.data)
            if (res.status === 200) {
                setPrograms(res.data.data.Program)
                setActivities(res.data.data.Activity)
            }
        } catch(error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getMentoringActivityByMentorId = async(id) => {
        try {
            let res = await axiosInstance.get(`/mentoring-schedules/mentor/${id}`)
            const mentoringUpdated = res.data.data.map((m) =>{
                let formattedDate = moment(m.StartDate).format('DD MMMM YYYY');
                return {
                    ...m,
                    FormattedDate: formattedDate
                }
            })
            setMentoring(mentoringUpdated)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getMentoringActivityByMenteeId = async(id) => {
        try {
            let res = await axiosInstance.get(`/mentoring-schedules/mentee/${id}`)
            const mentoringUpdated = res.data.data.map((m) =>{
                let formattedDate = moment(m.StartDate).format('DD MMMM YYYY');
                return {
                    ...m,
                    FormattedDate: formattedDate
                }
            })
            setMentoring(mentoringUpdated)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const deleteActivity = async(id) => {
        try {
            let res = await axiosInstance.delete(`/activities/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const deleteMentoringSchedule = async(id) => {
        try {
            let res = await axiosInstance.delete(`/mentoring-schedules/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        getPrograms,
        programs,
        activities,
        getMentoringActivityByMentorId,
        getMentoringActivityByMenteeId,
        mentoring,
        deleteActivity,
        deleteMentoringSchedule
    }
}

export default useActivityList