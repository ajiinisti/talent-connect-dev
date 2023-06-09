import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import { DefaultProfileIcon } from "../../assets"
import { useNavigate } from "react-router-dom"

const useAssignList = () => {
    const [participants, setParticipants] = useState([])
    const [assigned, setAssigned] = useState([])
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([])
    const [program, setProgram] = useState({})
    const navigate = useNavigate()
    

    const checkSelected = (selected, v) => {
        let sel = selected.find((w) => w.id == v.id)
        if (sel) return true
        return false
    }

    const getParticipants = async (id) => {
        try {
            let res = await axiosInstance.get("programs/"+id)
            if (res.status === 200) {
                let data = res.data.data
                let parti = data.Program?.participants?.map((v)=>({id : v.User.ID, name: v.User.FirstName + " " + v.User.LastName, profilePicture: DefaultProfileIcon, selected: false}))
                setParticipants(parti)
                setProgram(data.Program)
                setAllSelectedParticipants(parti)
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const getMentee = async (userId, programId) => {
        try {
            let res = await axiosInstance.get(`mentor-mentees/${userId}/${programId}`)
            if (res.status === 200) {   
                let data = res.data.data
                let selected = data.map((v)=>({id : v.Participant.ID, name: v.Participant.FirstName + " " + v.Participant.LastName, profilePicture: DefaultProfileIcon, selected: true}))
                console.log("selected",selected)
                setAllSelectedParticipants(allAspect => (allAspect.map((v)=> ({...v, selected : checkSelected(selected, v)}))))
                setAssigned(selected);
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const getEvaluatee = async (userId, programId) => { 
        try {
            let res = await axiosInstance.get(`evaluation/${userId}/${programId}`)
            if (res.status === 200) {   
                let data = res.data.data
                let selected = data.map((v)=>({participantId : v.Participant.ID, id : v.Participant.User.ID, name: v.Participant.User.FirstName + " " + v.Participant.User.LastName, profilePicture: DefaultProfileIcon, selected: true}))
                // console.log("selected",selected)
                setAllSelectedParticipants(allAspect => (allAspect.map((v)=> ({...v, selected : checkSelected(selected, v)}))))
                setAssigned(selected);
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const postMentee = async (mentorId, programId, users, toggleShow) => {
        for (const user of users) {
            if(assigned.find((v)=>v.id=user.id)) {
                toast(`${user.name} Already added`)
                continue
            }
            try {
                let payload = {
                    programId : programId,
                    participantId: user.id,
                    mentorId: mentorId
                }
                let res = await axiosInstance.post("mentor-mentees", payload)
                if (res.status === 200) {
                    toast(`Add ${user.name} Success`)
                } 
                
            } catch (error) {
                toast.error(`Add ${user.name} Failed`)
            }
        }
        toggleShow()
    }

    

    const postPanelist = async (panelistId, users, toggleShow) => {
        for (const user of users) {
            if(assigned.find((v)=>v.id=user.id)) {
                toast(`${user.name} Already added`)
                continue
            }
            try {
                let payload = {
                    participantId: user.participantId,
                    panelistId: panelistId
                }
                let res = await axiosInstance.post("evaluation", payload)
                if (res.status === 200) {
                    toast(`Add ${user.name} Success`)
                } 
                
            } catch (error) {
                toast.error(`Add ${user.name} Failed`)
            }
        }
        toggleShow()
    }
    return {
        participants,
        getParticipants,
        getMentee,
        assigned,
        allSelectedParticipants,
        setAllSelectedParticipants,
        postMentee,
        program,
        getEvaluatee,
        postPanelist
    }
}

export default useAssignList