import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const useEvaluationCategory = () =>{
    const [payload, setPayload] = useState({})
    const [allAspectList, setAllAspectList] = useState([])
    const [allSelectedAspects, setAllSelectedAspects] = useState([]);
    const [aspectList, setAspectList] = useState([])
    const navigate = useNavigate()

    const handleOnChange = (e)=> {
        setPayload({...payload, [e.target.name]:e.target.value})
    }

    const checkSelected = (selected, v) => {
        let sel = selected.find((w) => w.id===v.id)
        if (sel) return true
        return false
    }

    const getCategory = async (id) => {
        
        try {
            let res = await axiosInstance.get("category/questions/"+id)
            if (res.status === 200) {
                let data = res.data.data
                let pay = {}
                pay.ID = data.ID
                pay.Name = data.Name
                let selected = data.questions.map((v)=>({aspect: v.Question, option: v.Type, id: v.ID, selected: true}))
                setAllAspectList(allAspect => (allAspect.map((v)=> ({...v, selected : checkSelected(selected, v)}))))
                setAllSelectedAspects(allAspect => (allAspect.map((v)=> ({...v, selected : checkSelected(selected, v)}))))
                setAspectList(selected);
                setPayload(pay)
            }
        } catch (error) {
            toast.error("Failed to get Category")
        }
    }

    const getAspectList = async () =>{
        try {
            let res = await axiosInstance.get("/questions")
            if (res.status === 200) {
                let data = res.data.data.map((v)=>({aspect: v.Question, option: v.Type, id: v.ID, selected: false}))
                setAllAspectList(data)
                setAllSelectedAspects(data)
            }
        } catch (error) {
            toast.error("Failed to get Aspect")
        }
    }

    const handleSubmit = async(e, isUpdate, aspectList)=>{
        e.preventDefault()
        try {
            let formData = Object.assign({}, payload)
            formData.Questions = aspectList.map((v)=>({ID: v.id}))
            if(isUpdate){
                let res = await axiosInstance.put("category/questions", formData)
                if (res.status === 200) {
                    navigate(-1)
                }
            } else {
                let res = await axiosInstance.post("category/questions", formData)
                if (res.status === 200) {
                    navigate(-1)
                }
            }
        } catch (error) {
            console.log(error)
            if (isUpdate) {
                toast.error("Failed to Update Category")
            } else {
                toast.error("Failed to Create Category")
            }
        }
    }

    return {
        payload,
        allAspectList,
        allSelectedAspects,
        aspectList,
        getAspectList,
        setAllAspectList,
        getCategory,
        handleSubmit,
        handleOnChange,
        setAllSelectedAspects,
        setAspectList
    }
}

export default useEvaluationCategory