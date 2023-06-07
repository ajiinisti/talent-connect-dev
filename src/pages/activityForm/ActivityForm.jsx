import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';
import ArrowButton from "../../components/button/ArrowButton";
import CancelButton from "../../components/button/CancelButton";

const ActivityForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const isAdmin = false
    const isMentor = true
    const participants = [
        {value: "ID1", label:"Aji Inisti "},
        {value: "ID2", label:"Aji Udma "},
        {value: "ID3", label:"Aji Wijaya"},
    ]

    useEffect(()=> {
        if(params.id) {
            setUpdate(true)
        }
    },[params.id])

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><ArrowButton/>
                {
                    isUpdate ? " Edit Activity": " Add Activity"
                }
                </h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="activityTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="activityTitle" placeholder="Enter title"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input type="link" className="form-control" id="link" placeholder="Enter Link"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
                    </div>
                    {
                        isAdmin ?
                        <div className="mb-4">
                            <label htmlFor="participant" className="form-label">Participant</label>
                            <input disabled="disabled" type="participant" className="form-control" id="participant" placeholder="All"/>
                        </div> : <></>
                    }
                    {
                        isMentor ?
                        <div className="mb-4">
                            <label htmlFor="participant" className="form-label">Participant</label>
                            <Select
                                isMulti
                                name="participant"
                                options={participants}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div> : <></>
                    }
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="Text1" rows="5" id="description" className="form-control" placeholder="Description"></textarea>
                    </div>
                    {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} navigate={() => (0)}/>
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Activity"} navigate={() => (0)}/>
                        <CancelButton/>
                    </>
                }
                </form>
            </div>
        </div>
    )
}

export default ActivityForm