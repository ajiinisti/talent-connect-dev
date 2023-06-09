import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useProgram = () => {
    const [program, setProgram] = useState([])
    const [participantId, setParticipantId] = useState([])
    
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
            console.log(error)
        }
    }
    
    return {
        program,
        getPrograms,
        deleteProgram,
        participantId
    }
}

export default useProgram