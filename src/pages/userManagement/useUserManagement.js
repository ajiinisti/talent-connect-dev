import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useUserManagement = () => {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        try {
            let res = await axiosInstance.get("users")
            if(res.status === 200){
                let data = res.data.data
                setUsers(data)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    return {
        users,
        getUser
    }
}

export default useUserManagement