import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import EvaluationResult from "../../components/evaluationResult/EvaluationResult"

const useScore = () => {
    const [items, setItems] = useState([])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getScore = async (program_id) => {
        try {
            const res = await axiosInstance.get(`/auth/evaluation/score/${program_id}`)
            let data = []
            let key = 1
            for (const response of res.data.data.evaluation_stages) {
                let temp = {
                    key: key,
                    label: `${capitalizeFirstLetter(response.stage)} Evaluation`,
                    children: <EvaluationResult evaluation_stages={response}/> 
                }
                data.push(temp)
                key++
            }
            setItems(data)
        } catch (error) {
            if (error.response) toast.error(error.response.data.status.description)
            else toast.error(error.message)
        }
    }
    return {
        getScore,
        items
    }
}

export default useScore