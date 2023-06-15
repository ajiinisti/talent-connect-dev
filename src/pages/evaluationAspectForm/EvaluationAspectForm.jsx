import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';
import ArrowButton from "../../components/button/ArrowButton";
import CancelButton from "../../components/button/CancelButton";
import useAspectForm from "./useAspectForm";

const EvaluationAspectForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const {payload, onChange, onSelectChange, show, onSubmit, selectedOptions, getQuestions} = useAspectForm()
    const typeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'rating', label: 'Rating' }
    ]

    const optionOptions = [
        { value: 3, label: '1-3' },
        { value: 4, label: '1-4' },
        { value: 5, label: '1-5' },
    ]

    useEffect(()=> {
        if(params.id) {
            getQuestions(params.id)
            setUpdate(true)
        }
    },[params.id])

    return(
        <div className="container mt-4 py-5 px-5 mb-5">
            <h2><ArrowButton/><b>
                {
                    isUpdate ? " Edit Evaluation Aspect": " Add Evaluation Aspect"
                }
            </b></h2>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}} onSubmit={(e)=>onSubmit(e)}>
                <div className="mb-4">
                    <label htmlFor="evaluationAspectTitle" className="form-label">Title</label>
                    <input required type="text" className="form-control evaluation-aspect-form " id="evaluationAspectTitle" name="question" placeholder="Enter title" value={payload.question} onChange={(e)=> onChange(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="form-label">Type</label>
                    <Select required options={typeOptions} name="type" id="type" placeholder="Select type" value={selectedOptions?.type} onChange={(e)=>onSelectChange("type",e)}/>
                </div>
                {show &&
                <div className="mb-4">
                    <label htmlFor="option" className="form-label">Option</label>
                    <Select required options={optionOptions} id="option" placeholder="Select type" name="option" value={selectedOptions?.option} onChange={(e)=>onSelectChange("option",e)}/>
                </div>
                }
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea required name="description" rows="4" id="description" className="form-control" placeholder="Description" value={payload?.description} onChange={(e)=>onChange(e)}></textarea>
                </div>
                {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} />
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Evaluation Aspect"} />
                        <CancelButton/>
                    </>
                }
            </form>
        </div>
    )
}

export default EvaluationAspectForm