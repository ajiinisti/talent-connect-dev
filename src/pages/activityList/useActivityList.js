import { useState } from "react"
import moment from "moment"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useActivityList = () => {
    const [programs, setPrograms] = useState({})
    const [activities, setActivities] = useState([])
    const [mentoring, setMentoring] = useState([])
    const [allActivities, setAllActivities] = useState([])
    
    const getPrograms = async (id) => {
        try{
            let res = await axiosInstance.get(`/programs/${id}`)
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
            setMentoring(res.data.data)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getMentoringActivityByMenteeId = async(id) => {
        try {
            let res = await axiosInstance.get(`/mentoring-schedules/mentee/${id}`)
            setMentoring(res.data.data)
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

    const combineData = () => {
        const mergedData = [];
        console.log(mentoring)
        console.log(activities)
        mentoring?.forEach(item1 => {
            const matchingDate = activities.find(item2 => item2.Date === item1.Date);
            if (matchingDate) {
                const mergedItem = {
                Date: item1.Date,
                Activities: matchingDate.Activities,
                MentoringSchedules: item1.MentoringSchedules || []
                };

                mergedData.push(mergedItem);
            } else {
                const mergedItem = {
                Date: item1.Date,
                Activities: [],
                MentoringSchedules: item1.MentoringSchedules || []
                };

                mergedData.push(mergedItem);
            }
        });

        activities?.forEach(item2 => {
            const matchingDate = mergedData.find(item => item.Date === item2.Date);

            if (!matchingDate) {
                const mergedItem = {
                    Date: item2.Date,
                    Activities: item2.Activities || [],
                    MentoringSchedules: []
                };

                mergedData.push(mergedItem);
            }
        });
        console.log(mergedData)
        setAllActivities(groupByMonth(mergedData))
    }

    const groupByMonth = (data) => {
        const groupedData = {};
        data?.forEach(item => {
            const date = new Date(item.Date);
            const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            if (!groupedData[monthYear]) {
                groupedData[monthYear] = [];
            }
            groupedData[monthYear].push(item);
        });    
        return groupedData;
    }

    return {
        getPrograms,
        programs,
        activities,
        getMentoringActivityByMentorId,
        getMentoringActivityByMenteeId,
        mentoring,
        deleteActivity,
        deleteMentoringSchedule,
        combineData,
        allActivities
    }
}

export default useActivityList