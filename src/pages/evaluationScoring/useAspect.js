import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useAspect = () => {
    const [aspect, setAspect] = useState([])
    const [category, setCategory] = useState([])
    const [allProgram, setAllProgram] = useState([])

    const getProgram = async () => {
        
        try {
            let res = await axiosInstance.get("/programs")
            if (res.status === 200) {
                setAllProgram(res.data.data.map((v)=>({value: v.ID, label: v.Name})))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAspect = async () =>{
        try {
            let res = await axiosInstance.get("/questions")
            if (res.status === 200) setAspect(res.data.data)
        } catch (error) {
            console.log(error);
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
            console.log(error);
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

    return {getAspect, getCategory, aspect, category, allProgram, setAllProgram, getProgram, postProgEval
    }

}
export default useAspect