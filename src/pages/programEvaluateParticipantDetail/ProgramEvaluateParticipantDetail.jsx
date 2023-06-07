import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select'
import { CFormCheck } from '@coreui/react'

const ProgramEvaluateParticipantDetail = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)

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
            setUpdate(true)
        }
    },[params.id])

    return(
        <div className="container py-5 px-5 mb-5">
            { isUpdate }
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><BsArrowLeft/> Ariel Nathania </h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="evaluationPeriod" className="form-label">Evaluation Period</label>
                        <Select options={evaluationPeriod} id="evaluationPeriod"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Feature</label>
                        <textarea name="Text1" rows="5" id="description" className="form-control">Feature</textarea>
                    </div>  
                    <div className="mb-4">
                        <label htmlFor="link" className="form-label m">Security</label>
                        <div>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="option1" label="1"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" value="option2" label="2"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox3" value="option3" label="3"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox4" value="option4" label="4"/>
                            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox5" value="option5" label="5"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="evaluationResult" className="form-label">Evaluation Period</label>
                        <Select options={evaluationResult} id="evaluationResult"/>
                    </div>           
                    <Button title={"Add Evaluation"} navigate={() => (0)}/>
                    <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                </form>
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipantDetail