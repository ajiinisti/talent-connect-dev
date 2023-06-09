import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import { DefaultProfileIcon } from "../../assets"
// import { useNavigate } from "react-router-dom"

const useAssignList = () => {
    const [participants, setParticipants] = useState([])
    const [assigned, setAssigned] = useState([])
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([])
    const [program, setProgram] = useState({})
    // const navigate = useNavigate()

    const checkSelected = (selected, v) => {
        let sel = selected.find((w) => w.id===v.id)
        if (sel) return true
        return false
    }

    const getParticipants = async (id) => {
        try {
            let res = await axiosInstance.get("programs/"+id)
            if (res.status === 200) {
                let data = res.data.data
                let parti = data.Program?.participants?.map((v)=>({participantId:v.ID, id : v.User.ID, name: v.User.FirstName + " " + v.User.LastName, profilePicture: DefaultProfileIcon, selected: false}))
                setParticipants(parti)
                setProgram(data.Program)
                setAllSelectedParticipants(parti)
                return parti
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const getMentee = async (userId, programId, name) => {
        try {
            const qs = new URLSearchParams({name});
            let res = await axiosInstance.get(`users/mentor/${programId}/${userId}?${qs}`)
            if (res.status === 200) {   
                let data = res.data.data
                return data
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const getEvaluatee = async (userId, programId, name) => { 
        try {
            const qs = new URLSearchParams({name});
            let res = await axiosInstance.get(`users/panelist/${programId}/${userId}?${qs}`)
            if (res.status === 200) {   
                let data = res.data.data
                return data
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const postMentee = async (mentorId, programId, users, toggleShow) => {
        for (const user of users) {
            if(assigned.find((v)=>v.id===user.id)) {
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
                toast.error(`Add ${user.name} Failed, ${error.response.data.status.description}`)
            }
        }
        await getMentee(participants, mentorId, programId)
        toggleShow()
        setAllSelectedParticipants([])
    }

    

    const postPanelist = async (programId, panelistId, users, toggleShow) => {
        for (const user of users) {
            if(assigned.find((v)=>v.id===user.id)) {
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
                toast.error(`Add ${user.name} Failed,\n ${error.response.data.status.description}`)
            }
        }
        setAllSelectedParticipants([])
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
        postPanelist,
        initAssign
    }
}

export default useAssignList