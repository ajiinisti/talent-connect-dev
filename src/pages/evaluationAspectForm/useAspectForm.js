import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const useAspectForm = () => {
    const [payload, setPayload] = useState({})
    const [selectedOptions, setSelectedOptions] = useState({})
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getQuestions = async (id) => {
        try {
            let res = await axiosInstance.get("questions/"+id)
            if (res.status===200) {
                let pay = {}
                let select = {}
                let data = res.data.data
                pay.type = data.Type
                pay.question = data.Question
                if(pay.type === 'rating'){
                    let option = data.options.length
                    setShow(true)
                    pay.option = data.options.length
                    select.option ={value:  option, label: `1-${option}`}
                }
                pay.ID = data.ID
                select.type = {value:  pay.type, label: capitalizeFirstLetter(pay.type)}
                setSelectedOptions(select)
                setPayload(pay)
            }
            
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const onSelectChange = (name, e) => {
        let pay = Object.assign({},payload)
        if (e.value === 'text'){
            setShow(false)
        } else if (e.value === "rating") {
            setShow(true)
        }
        setSelectedOptions({...selectedOptions, [name]:e})
        pay = {...pay, [name]:e.value}
        setPayload(pay)
    }

    const onChange = (e) =>{
        setPayload({...payload, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e, isUpdate) => {
        e.preventDefault()
        const formPayload = Object.assign({}, payload)
        if(formPayload.type !== 'rating'){
            delete formPayload.option
        } 
        try {
            if (!isUpdate){
                let res = await axiosInstance.post("/questions",formPayload)
                if (res.status === 200){
                    navigate(-1)
                }
            else {
                let res = await axiosInstance.put("/questions",formPayload)
                if (res.status === 200){
                    navigate(-1)
                }

            }
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    return {
        payload,
        show,
        onSelectChange,
        onChange, 
        onSubmit,
        getQuestions,
        selectedOptions
    }
}

export default useAspectForm