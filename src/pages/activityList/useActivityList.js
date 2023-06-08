import { useState } from "react"
import moment from "moment"
import axiosInstance from "../../services/axios-client"

const useActivityList = () => {
    const [programs, setPrograms] = useState({})
    const [activities, setActivities] = useState([])
    const [mentoring, setMentoring] = useState([])
    
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
            console.log(error)
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
            console.log(error)
        }
    }

    return {
        getPrograms,
        programs,
        activities,
        getMentoringActivityByMentorId,
        getMentoringActivityByMenteeId,
        mentoring
    }
}

export default useActivityList