import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useAspect = () => {
    const [aspect, setAspect] = useState([])
    const [category, setCategory] = useState([])
    const [allProgram, setAllProgram] = useState([])

    const getProgram = async () => {
        
        try {
            let res = await axiosInstance.get("/auth/programs")
            if (res.status === 200) {
                const newData = res.data.data.admin.map((v)=>({value: v.ID, label: v.Name}))
                setAllProgram(newData)
            }
        } catch (error) {
            console.log(error)
            toast.error("Cannot get programs")
        }
    }

    const getAspect = async () =>{
        try {
            let res = await axiosInstance.get("/questions")
            if (res.status === 200) setAspect(res.data.data)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }
    const getCategory = async () =>{
        try {
            let res = await axiosInstance.get("/category/questions")
            if (res.status === 200) setCategory(res.data.data)
            else{
                return {}
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const postProgEval = async (payload, setIsModalOut) => {
        try {
            payload.CategoryWeight = Number(payload.CategoryWeight)
            let res = await axiosInstance.post("/category/evaluation", payload)
            if (res.status === 200) {
                setIsModalOut(false)
            }
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const deleteAspect= async(id) => {
        try {
            let res = await axiosInstance.delete(`/questions/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const deleteCategory = async(id) => {
        try {
            let res = await axiosInstance.delete(`/category/questions/${id}`)
            console.log(res)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        getAspect, 
        getCategory, 
        aspect, 
        category, 
        allProgram, 
        setAllProgram, 
        getProgram, 
        postProgEval,
        deleteAspect,
        deleteCategory
    }

}
export default useAspect