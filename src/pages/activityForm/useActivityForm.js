import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useActivityForm = () => {
    const navigate = useNavigate()
    const [activity, setActivity] = useState({
        ID : '',
        name: '',
        link: '',
        startDate: '',
        participant : [],
        description: ''
    })
    
    const [participants, setParticipants] = useState ([])

    const handleSelectParticipant = (selectedOptions) => {
        setActivity({
            ...activity,
            participant: selectedOptions
        });
    };

    // Fetch Mentor Mentee (mentoring schedule)
    const getMentee = async (id) => {
        try {
            let res = await axiosInstance.get("/mentor-mentees/"+id)
            if(res.status === 200) {
                return res.data.data
            }
            return 
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const fetchMentorMentee = async(id) => {
        const getData = await getMentee(id)
        for (const data of getData) {
            setParticipants(
                [
                    ...participants, 
                    {
                        value: data.ID,
                        label: data.Participant.FirstName+" "+ data.Participant.LastName
                    }
                ]
            )
        }
    }
    
    // Convert Date
    const convertDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
      
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDateTime;
      };
      

    // Fetch Mentoring Schedule Update Form
    const getMentoringScheduleById = async(id) => {
        try {
            let res = await axiosInstance.get("/mentoring-schedules/"+id)
            if(res.status === 200) {
                return res.data.data
            }
            return 
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const fetchActivityMentoring = async(id) => {
        const getData = await getMentoringScheduleById(id)
        
        const date = new Date(getData.StartDate);
        const formattedDateTime = convertDate(date)

        const selectedParticipant = []
        for (const participant of getData.mentorMentees) {
            const data = {
                value: participant.ID,
                label: participant.Participant.FirstName+" "+ participant.Participant.LastName
            }
            selectedParticipant.push(data)
        }
        setActivity({
            ID: getData.ID,
            name: getData.Name,
            link: getData.Link,
            startDate: formattedDateTime,
            description: getData.Description,
            participant: selectedParticipant,
        })
    }

    // Fetch Activity Update Form
    const getActivityById = async (id) => {
        try {
            let res = await axiosInstance.get("/activities/"+id)
            if(res.status === 200) {
                return res.data.data
            }
            return 
            
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const fetchActivityProgram = async(id) => {
        const getData = await getActivityById(id)

        const date = new Date(getData.StartDate);
        const formattedDateTime = convertDate(date)

        setActivity({
            ID: getData.ID,
            name: getData.Name,
            link: getData.Link,
            startDate: formattedDateTime,
            description: getData.Description
        })
    }

    const preProcessingData = (data) => {
        const newParticipant = []
        for (const participant of data.participant) {
            newParticipant.push(participant.value)
        }
        const isoStartDate = new Date(data.startDate).toISOString()
        return {
            ...data,
            mentorMentees: newParticipant,
            startDate: isoStartDate,
        }
    }

    const postMentoringSchedule = async(data, programId) => {
        try {
            const newData = preProcessingData(data)
            let res = await axiosInstance.post("/mentoring-schedules", newData)
            if(res.status === 200) {
                navigate(-1)
            }
            
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const postActivity = async(data, programId) => {
        try {
            const newData = preProcessingData(data)
            let res = await axiosInstance.post("/activities", {
                ...newData,
                ProgramID : programId
            })
            console.log(res)
            if(res.status === 200) {
                navigate(-1)
            }
            
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const putMentoringSchedule = async(data, programId) => {
        try {
            const newData = preProcessingData(data)
            let res = await axiosInstance.put("/mentoring-schedules", newData)
            if(res.status === 200) {
                navigate(-1)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const putActivity = async(data, programId) => {
        try {
            let res = await axiosInstance.put("/activities", {
                ...data,
                ProgramID : programId,
                startDate: new Date(data.startDate).toISOString(),
            })
            if(res.status === 200) {
                navigate(-1)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }


    return {
        activity,
        setActivity,
        participants,
        setParticipants,
        handleSelectParticipant,
        fetchMentorMentee,
        fetchActivityProgram,
        fetchActivityMentoring,
        postMentoringSchedule,
        postActivity,
        putMentoringSchedule,
        putActivity,
    }

}

export default useActivityForm