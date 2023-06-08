import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"

const useActivityForm = () => {
    const [activity, setActivity] = useState({
        title: '',
        link: '',
        starDate: '',
        participant : '',
        description: ''
    })
    
    const [participants, setParticipants] = useState ([])
    const getMentee = async (id) => {
        let res = await axiosInstance.get("/mentor-mentees/"+id)
        if(res.status === 200) {
            return res.data.data
        }
        return 
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

    const postMentoring = async(data) => {

    }

    return {
        activity,
        setActivity,
        participants,
        setParticipants,
        getMentee,
        fetchMentorMentee
    }

}

export default useActivityForm