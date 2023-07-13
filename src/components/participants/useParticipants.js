import { toast } from "react-toastify"
import axiosInstance from "../../services/axios-client"
import { useState } from "react"

const useParticipants = () => {
    const [mentor, setMentor] = useState([])
    const getAllMentorMentee = async (allProgramParticipant) => {
        try {
            let res = await axiosInstance.get("/mentor-mentees")
            let data = res?.data?.data
            if(res.status === 200) {
                if (allProgramParticipant) {       
                    for (const mentee of allProgramParticipant) {
                        for (const mentorMentee of data) {
                            if (mentorMentee.ParticipantID === mentee.UserID) {
                                if(data.Mentor)
                                setMentor([...mentor, {Name:`${data?.Mentor.FirstName} ${data?.Mentor.LastName}`}])
                            }
                        }
                    }
                }
            }
            return 
        } catch (error) {
            if(error.response)
            toast.error(error.response.data.status.description)
            else toast.error(error.message)
        }
    }

    return {
        getAllMentorMentee,
        mentor
    }
}

export default useParticipants