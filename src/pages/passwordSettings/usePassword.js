import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const usePassword = () => {
    const changePassword = async (currentPassword, newPassword) => {
        try {
            let data = {
                currentPassword,
                newPassword
            }
            let res = await axiosInstance.post("/auth/change-password",data)
            console.log(res)
            if(res.status === 200) {
                toast.success("Password changed successfully")
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        changePassword,
    }
}

export default usePassword