import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import { format, parseISO } from "date-fns"
import { DefaultProfileIcon } from "../../assets"

const useActivityDetail = () => {
    const {getCurrentUser} = useAuth()
    const [activity, setActivity] = useState({})
    const [participants, setParticipants] = useState([])
    const [programName, setProgramName] = useState("")
    const [feedback, setFeedback] = useState({})
    
    const getDetailActivity = async (id) => {
        try {
            let res = await axiosInstance.get("activities/"+id)
            if (res.status === 200) {
                setActivity(res.data.data)
                setParticipants(res.data.data.program.participants)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getDetailMonitoring = async(id) => {
        try {
            let res = await axiosInstance.get("mentoring-schedules/"+id)
            const data = res.data.data
            if (res.status === 200) {
                const participants = []
                for (const mentorMentee of data.mentorMentees) {
                    participants.push(mentorMentee.Participant.FirstName+" "+mentorMentee.Participant.LastName+", ")
                }
                participants.push(data.mentorMentees[0].Mentor.FirstName+" "+data.mentorMentees[0].Mentor.LastName)
                setActivity({
                    Name: data.Name,
                    Link: data.Link,
                    StartDate: data.StartDate,
                    Participants: participants,
                    Description: data.Description
                })
            }

            console.log(data)
            for (const comment of data.MentorMenteeSchedules) {
                for (const mentorMentee of data.mentorMentees) {
                    if ((mentorMentee.ParticipantID === getCurrentUser().ID || mentorMentee.MentorID === getCurrentUser().ID) && comment.MentorMenteeID === mentorMentee.ID) {
                        const date = parseISO(comment.Date);
                        const formattedDate = format(date, 'dd MMMM yyyy')
                        setFeedback({
                            Mentor: `${mentorMentee.Mentor.FirstName} ${mentorMentee.Mentor.LastName}`,
                            Feedback: comment.Comment,
                            Date: formattedDate,
                            Image: DefaultProfileIcon
                        })
                    }        
                }
            }
            // console.log(data)
            return data
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getPrograms = async (id) => {
        try{
            let res = await axiosInstance.get(`/programs/${id}`)
            if (res.status === 200) {
                setParticipants(res.data.data.Program.participants)
                setProgramName(res.data.data.Program.Name)
            }
        } catch(error) {
            toast.error(error.response.data.status.description)
        }
    }
    return {
        activity,
        getDetailActivity,
        getDetailMonitoring,
        getPrograms,
        participants,
        programName,
        feedback
    }
}

export default useActivityDetail