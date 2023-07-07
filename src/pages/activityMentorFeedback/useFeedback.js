import { useState } from "react"
import useActivityDetail from "../activityDetail/useActivityDetail"
import { DefaultProfileIcon } from "../../assets"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import { format, parseISO } from 'date-fns';
import { useNavigate } from "react-router-dom"

const useFeedback = () => {
    const navigate = useNavigate()
    const [feedbackData, setFeedbackData] = useState([])
    const [feedback, setCountFeedback] = useState({
        given: 0,
        empty: 0
    })

    const {getDetailMonitoring} = useActivityDetail()

    const fetchMentee = async (id) => {
        try {
            let res = await getDetailMonitoring(id)
            let given = 0
            let empty = 0
            console.log(res)
            for (const data of res.MentorMenteeSchedules) {
                for (const getName of res.mentorMentees) {
                    if(data.MentorMenteeID === getName.ID){
                        const date = parseISO(data.Date);
                        const formattedDate = format(date, 'dd MMMM yyyy')
                        let newData = {
                            ...data,
                            Date: formattedDate,
                            Img: DefaultProfileIcon,
                            Mentor: `${getName.Mentor.FirstName} ${getName.Mentor.LastName}`,
                            Name: `${getName.Participant.FirstName} ${getName.Participant.LastName}`
                        }
                        
                        console.log(newData)
                        if (newData.Comment === "") {
                            empty += 1
                        } else {
                            given += 1
                        }

                        setFeedbackData([
                            ...feedbackData,
                            newData
                        ])

                        setCountFeedback({
                            empty,
                            given
                        })
                    }
                } 
            }
        } catch (error) {
            
        }
    }

    const postFeedback = async(data) => {
        try {
            console.log(data)
            let res = await axiosInstance.post('/mentoring-schedules/feedback/',data)
            console.log("res: ",res)
            if (res.status === 200 ){
                toast.success("Successfully create feedback")
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return{
        feedbackData,
        feedback,
        fetchMentee,
        postFeedback
    }
}

export default useFeedback