import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useProgram = () => {
    const [program, setProgram] = useState({
        admin: [],
        panelist: [],
        mentor: [],
        participant: []})
    const [participantId, setParticipantId] = useState([])

    const getMenteeCandidate = async (id, name) => {
        try {
            const qs = new URLSearchParams({name : name});
            let res = await axiosInstance.get("users/mentee/"+id+"?"+qs)
            return res.data.data
        } catch (error) {
            toast.error(error.response.data.status.description )
        }
    }
    
    const getPrograms = async () => {
        try {
            let res = await axiosInstance.get("auth/programs")
            if (res.status === 200) {
              const data = res.data.data
              setProgram(data)
              if(data.admin){
                  let da = data.admin.map((d)=> {
                    if (!d.participants) return []
                    return d.participants.map((v)=>(v.UserID)
                    )
                })
                setParticipantId(da)
              }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteProgram = async(id) => {
        try {
            let res = await axiosInstance.delete(`/programs/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    
    return {
        program,
        getPrograms,
        deleteProgram,
        participantId,
        getMenteeCandidate  
    }
}

export default useProgram