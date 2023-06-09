import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"

const useEvaluate = () => {
    
    const [questions, setQuestions] = useState([])
    const [payload, setPayload] = useState({})

    const onInputChange = ((event, i, j)=>{
        let newState = JSON.parse(JSON.stringify(payload))
        newState.QuestionCategories = newState.QuestionCategories.map((v, index)=>{
            if(index === i) {
                let questionList = v.QuestionList.map((question, jndex)=> {
                    if (jndex===j)
                    return {...question, Answer : event.target.value}
                    return question
                })
                return {...v, QuestionList: questionList}
            }
            return v
        })
        setPayload(newState)
    })
    

    const onSubmit = async () => {
        try {
            await axiosInstance.post(`/answer`, payload)  
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    const getQuestions = async (programId, evalId) => {
        try {
            let res = await axiosInstance.get(`/programs/questions/${programId}`)
            setQuestions(res.data.data)
            let data = Object.assign({}, payload)
            data.QuestionCategories = []
            data.EvaluationID = evalId
            data.ProgramID = programId
            res.data.data.forEach((v, i)=>{
                let temp = {CategoryID : v.ID, QuestionList: []}
                data.QuestionCategories.push(temp)
                data.QuestionCategories[i].QuestionList = []
                v.QuestionCategory.questions.forEach((question, j)=>{
                    temp = {QuestionID: question.ID, Answer : ""}
                    data.QuestionCategories[i].QuestionList.push(temp)
                })
            })
            setPayload(data)
        } catch (error) {
            toast.error(error.response.data.status.description)
        }
    }

    return {
        questions,
        payload,
        onInputChange,
        onSubmit,
        getQuestions
    }

}

export default useEvaluate