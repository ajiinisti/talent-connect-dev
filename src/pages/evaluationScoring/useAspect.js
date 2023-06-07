import { useState } from "react"
import axiosInstance from "../../services/axios-client"

const useAspect = () => {
    const [aspect, setAspect] = useState([])
    const [category, setCategory] = useState([])

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

    return {getAspect, getCategory, aspect, category
    }

}
export default useAspect