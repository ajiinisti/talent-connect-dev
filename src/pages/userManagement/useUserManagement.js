import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useUserManagement = () => {
    const [users, setUsers] = useState([])
    const [role, setRole] = useState(null)
    const [name, setName] = useState('')

    const getUser = async () => {
        try {
            const options = {
                name: name,
                role: role || ''
            }
            const qs = new URLSearchParams(options)
            let res = await axiosInstance.get(`users?${qs.toString()}`)
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
        getUser,
        setRole,
        setName,
        name,
        role
    }
}

export default useUserManagement