import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select'
import { CFormCheck } from '@coreui/react'
import { axiosInstance } from "../../lib/axios-client"

const ProgramEvaluateParticipantDetail = () => {
    const params = useParams()
    const [questions, setQuestions] = useState([])
    const [payload, setPayload] = useState({})

    const evaluationPeriod = [
        { value: 'mid', label: 'Mid Evaluation' },
        { value: 'final', label: 'Final Evaluation' }
    ]

    const evaluationResult = [
        { value: 'passed', label: 'Passed' },
        { value: 'failed', label: 'Failed' }
    ]

    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        marginLeft: '1rem'
    }

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

    const onSubmit = () => {
        axiosInstance.post(`/answer`, payload).then((res)=>console.log(res))
    }

    useEffect(()=> {
        axiosInstance.get(`/programs/questions/${params.programId}`).then((res)=>{
            setQuestions(res.data.data)
            let data = Object.assign({}, payload)
            data.QuestionCategories = []
            data.EvaluationID = params.evalIid
            data.ProgramID = params.programId
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
        })
    }, [])

    return(
        <div className="container py-3 px-5 mb-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><BsArrowLeft/> Ariel Nathania </h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="evaluationPeriod" className="form-label">Evaluation Period</label>
                        <Select options={evaluationPeriod} id="evaluationPeriod"/>
                    </div>
                    {questions.map((v, i)=>(
                        <div key={v.ID}>
                            <h2>{v.QuestionCategory.Name}</h2>
                            <p style={{fontSize:'11pt'}}>{v.QuestionCategory.Description}</p>
                            {v.QuestionCategory.questions.map((question, j) =>(
                            <div key={question.ID} className="mb-4">
                                <label htmlFor={`qes-${v.ID}-${question.ID}`} className="form-label">{question.Question}</label>
                                {question.Type === "rating" ? (
                                <div>
                                    {question.options.map((val, k) => (
                                        <CFormCheck key={k} inline type="radio" name={`qes-${v.ID}-${question.ID}`} id={`qes-${v.ID}-${question.ID}-${k}`} value={val.Value} label={val.Value} onChange={
                                            (e) => {
                                               onInputChange(e, i, j)
                                        }} checked={payload.QuestionCategories[i].QuestionList[j].Answer == val.Value}/>
                                    ))}
                                </div>
                                ) : (
                                    <textarea rows="5" name={`qes-${v.CategoryID}-${question.ID}`} className="form-control" onChange={(e)=>onInputChange(e,i,j)}></textarea>
                                )}
                                
                            </div>  
                            )

                            )}

                        </div>

                    ))}
                    <Button title={"Add Evaluation"} navigate={(e) => {
                        e.preventDefault()
                        onSubmit()
                        }}/>
                    <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                </form>
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipantDetail