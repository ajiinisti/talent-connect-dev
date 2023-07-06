import { useState } from "react"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"


const evaluationPeriod = [
    { value: 'mid', label: 'Mid Evaluation' },
    { value: 'final', label: 'Final Evaluation' }
]
const useEvaluate = () => {
    
    const [questions, setQuestions] = useState([])
    const [payload, setPayload] = useState({})
    const [mentee, setMentee] = useState({name: ""})
    const [period, setPeriod] = useState(evaluationPeriod[0])
    const [program, setProgram] = useState("")

    const onInputChange = ((event, i, j)=>{
        let newState = JSON.parse(JSON.stringify(payload))
        newState.QuestionCategories = newState.QuestionCategories.map((v, index)=>{
            if(index === i) {
                let questionList = v.QuestionList.map((question, jndex)=> {
                    if (jndex == j)
                    return {...question, Answer : event.target.value}
                    return question
                })
                return {...v, QuestionList: questionList}
            }
            return v
        })
        setPayload(newState)
    })
    

    const onSubmit = async (programId, evalId) => {
        try {
            if (payload.detail) {
                throw new Error("Answer already submitted")
            }
            const data = await axiosInstance.post(`/answer`, payload)  
            if (data.status === 200) {
                await getQuestions(programId, evalId)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getProgram = async (programId) => {
        try {
            let res = await axiosInstance.get("/programs/"+programId)
            const data = res.data.data
            setProgram(data.Program.Name)
        } catch (error) {
            
        }
    }

    const getEval = async (evalId) => {
        try {
            let res = await axiosInstance.get("/evaluation/"+evalId)
            const data = res.data.data
            setMentee({name: data.Participant.User.FirstName + " " + data.Participant.User.LastName})
            setPeriod(data.Stage === 'mid' ? evaluationPeriod[0] : evaluationPeriod[1])
        } catch (error) {
            
        }
    }

    const getQuestions = async (programId, evalId) => {
        try {
            let res = await axiosInstance.get(`/programs/questions/${programId}`)
            let answerRes = await axiosInstance.get(`/auth/answers/${evalId}`)
            let answers = answerRes.data.data
            setQuestions(res.data.data)
            let data = Object.assign({}, payload)
            if(answers.length > 0) data.detail = true; else data.detail = false;
            data.QuestionCategories = []
            data.EvaluationID = evalId
            data.ProgramID = programId
            res.data.data.forEach((v, i)=>{
                let temp = {CategoryID : v.ID, QuestionList: []}
                data.QuestionCategories.push(temp)
                data.QuestionCategories[i].QuestionList = []
                v.QuestionCategory.questions.forEach((question, j)=>{
                    const answer = answers.find((v)=>v.QuestionID===question.ID)
                    temp = {QuestionID: question.ID, Answer : answer? answer.Answer.Answer || "" : ""}
                    data.QuestionCategories[i].QuestionList.push(temp)
                })
            })
            setPayload(data)
        } catch (error) {
            console.log(error);
        }
    }

    return {
        questions,
        payload,
        onInputChange,
        onSubmit,
        getQuestions,
        getEval,
        getProgram,
        mentee,
        period,
        program
    }

}

export default useEvaluate