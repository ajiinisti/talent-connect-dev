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
    const {questions, payload, onInputChange, onSubmit, getQuestions, getEval, mentee, period, getProgram, program} = useEvaluate()

    const programId = params.programId
    const evalId = params.evalIid

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
        if(evalId) {
            getEval(evalId)
            getProgram(programId)
        }
    },[evalId])

    useEffect(()=> {
        getQuestions(programId, evalId)
    }, [programId, evalId])

    const createOption = (question, num, v, i, j) => {
        const rows = []
        for (let index = 0; index < num; index++) {
            // if checked then disabled
            rows.push(<CFormCheck key={index} inline type="radio" name={`qes-${v.ID}-${question.ID}`} id={`qes-${v.ID}-${question.ID}-${index}`} value={index+1} label={index+1} onChange={
                (e) => {
                   onInputChange(e, i, j)
            }} checked={payload.QuestionCategories[i].QuestionList[j].Answer == index+1} disabled={payload.detail}/>)     
        }
        return (rows)
    }

    return(
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><b>{program}</b></h2>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><ArrowButton/> {mentee.name} </h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="evaluationPeriod" className="form-label">Evaluation Period</label>
                        <Select options={evaluationPeriod} isDisabled value={period} id="evaluationPeriod"/>
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
                                    {createOption(question, question.Option, v, i, j)}
                                </div>
                                ) : (
                                    // if answered then disabled
                                    <textarea disabled={payload.detail} rows="5" name={`qes-${v.CategoryID}-${question.ID}`} className="form-control" onChange={(e)=>onInputChange(e,i,j)}></textarea>
                                )}
                                
                            </div>  
                            )

                            )}

                        </div>

                    ))}
                    <div className="mb-4">
                        {/* <label htmlFor="evaluationResult" className="form-label">Evaluation Result</label> */}
                        {/* <Select options={evaluationResult} id="evaluationResult"/> */}
                    </div> 
                    <Button title={"Add Evaluation"} 
                        navigate={(e) => {
                            e.preventDefault()
                            onSubmit(programId, evalId)
                            }}
                        disabled={payload.detail}/>
                        <CancelButton/>
                </form>
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipantDetail