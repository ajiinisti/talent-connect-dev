import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useUser = () => {
    const [payload, setPayload] = useState({Name: '', Email: ''})
    const [selectedOption, setSelectedOption] = useState()
    const [options, setOptions] = useState()
    const navigate = useNavigate()

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getRole = async () => {
        try {
            let res = await axiosInstance.get("roles")
            if (res.status === 200) {
                let data = res.data.data
                setOptions(data.map((v)=>({value: v.Name, label: capitalizeFirstLetter(v.Name) })))
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const getUser = async (id) => {
        try {
            let res = await axiosInstance.get("users/"+id)
            if (res.status === 200) {
                let data = res.data.data
                let pay = {}
                pay.ID = data.ID
                pay.Name = data.FirstName + " " + data.LastName
                pay.Email = data.Email
                setSelectedOption({value: data.Roles[0].Name, label: capitalizeFirstLetter(data.Roles[0].Name)})
                setPayload(pay)
            }
        } catch (error) {
            console.log(error)
            toast(error.response.data.status.description)
            
        }
    }

    const handleSubmit = async (e, isUpdate) => {
        e.preventDefault()
        let formData = new FormData()
        if(payload.Name){
            const fullName = payload.Name
            const name = fullName.split(" ");
            payload.FirstName = name[0]
            payload.LastName = fullName.replace(name[0]+" ", "")
            delete payload.Name
        }
        formData.append("user", JSON.stringify(payload) )
        formData.append("role", JSON.stringify([selectedOption.value]))
        try {
            if(isUpdate){    
                let res = await axiosInstance.put("/users", formData)
                if (res.status === 200) {
                    navigate("/user-management/")
                }
            } else {
                let res = await axiosInstance.post("/users", formData)
                if (res.status === 200) {
                    navigate("/user-management/")
                }
            }
        } catch (error) {
            toast(error.response.data.status.description)
        }
    }

    const onChangeHandle = (e) => {
        setPayload({...payload, [e.target.name]: e.target.value})
    }
    
    const onSelectChange = (e) => {
        setSelectedOption(e)
    }
    return {
        payload,
        onChangeHandle,
        selectedOption,
        onSelectChange,
        options,
        getRole,
        handleSubmit,
        getUser
    }
}

export default useUser