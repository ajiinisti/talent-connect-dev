import { useState } from "react"
import axiosInstance from "./axios-client"
import { DefaultProfileIcon } from "../assets"

const useParticipant = () => {
    const [participants, setParticipants] = useState([])
    const getParticipantList = async (role) => {
        let url = "users"
        if (role) {
            url += `?role=${role}`
        }
        try {
            let res = await axiosInstance.get(url)
            let data = res.data.data.map((v)=>(
                {name: v.FirstName+" "+v.LastName, profilePicture: DefaultProfileIcon}
            ))
            setParticipants(data)
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getParticipantList,
        participants
    }
}

export default useParticipant
