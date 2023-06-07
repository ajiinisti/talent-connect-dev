import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';
import ArrowButton from "../../components/button/ArrowButton";
import CancelButton from "../../components/button/CancelButton";

const EvaluationAspectForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const typeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'rating', label: 'Rating' }
    ]

    const optionOptions = [
        { value: '1-5', label: '1-5' },
        { value: 'rating', label: 'Rating' }
    ]

    useEffect(()=> {
        if(params.id) {
            setUpdate(true)
        }
    },[params.id])

    return(
        <div className="container mt-4 py-5 px-5 mb-5">
            <h1><ArrowButton/><b>
                {
                    isUpdate ? " Edit Evaluation Aspect": " Add Evaluation Aspect"
                }
            </b></h1>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="mb-4">
                    <label htmlFor="evaluationAspectTitle" className="form-label">Title</label>
                    <input type="text" className="form-control evaluation-aspect-form " id="evaluationAspectTitle" placeholder="Enter title"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="form-label">Type</label>
                    <Select options={typeOptions} id="type" placeholder="Select type"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="option" className="form-label">Option</label>
                    <Select options={optionOptions} id="option" placeholder="Select type"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="Text1" rows="4" id="description" className="form-control" placeholder="Description"></textarea>
                </div>
                {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} navigate={() => (0)}/>
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Evaluation Aspect"} navigate={() => (0)}/>
                        <CancelButton/>
                    </>
                }
            </form>
        </div>
    )
}

export default EvaluationAspectForm