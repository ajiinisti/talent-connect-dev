import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select'
import { CFormCheck } from '@coreui/react'
import ArrowButton from "../../components/button/ArrowButton"
import CancelButton from "../../components/button/CancelButton"
import useEvaluate from "./useEvaluate"

const ProgramEvaluateParticipantDetail = () => {
    const params = useParams()
    const {questions, payload, onInputChange, onSubmit, getQuestions} = useEvaluate()
    const [isDetail, setDetail] = useState(false)

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
    useEffect(()=> {
        if(params.id) {
            setDetail(true)
        }
    },[params.id])

    useEffect(()=> {
        getQuestions(params.programId, params.evalId)
    }, [getQuestions, params.programId, params.evalId])

    return(
        <div className="container py-5 px-5 mb-5">
            { isDetail }
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><ArrowButton/> Ariel Nathania </h4>
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
                    <div className="mb-4">
                        <label htmlFor="evaluationResult" className="form-label">Evaluation Period</label>
                        <Select options={evaluationResult} id="evaluationResult"/>
                    </div> 
                    <Button title={"Add Evaluation"} navigate={(e) => {
                        e.preventDefault()
                        onSubmit()
                        }}/>
                        <CancelButton/>
                </form>
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipantDetail