import Button from "../../components/button/Button"
// import Layout from "../../components/layout/Layout"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CancelButton from "../../components/button/CancelButton"
import ArrowButton from "../../components/button/ArrowButton"

const ProgramForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)

    const buttonStyle = {
        height: '40px'
    }

    useEffect(()=> {
        if(params.id) {
            setUpdate(true)
        }
    },[params.id])

    return(
        <div className="container mt-4 px-4">
            <h1><ArrowButton/><b>
                {
                    isUpdate ? " Edit Program": " Add Program"
                }
            </b></h1>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="mb-4">
                    <label htmlFor="programTitle" className="form-label">Title</label>
                    <input type="text" className="form-control program-form " id="programTitle" placeholder="Enter title"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input type="date" className="form-control program-form " id="startDate" placeholder="DD/MM/YYYY"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input type="date" className="form-control program-form " id="endDate" placeholder="DD/MM/YYYY"/>
                </div>
                {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} navigate={() => (0)} styling={buttonStyle}/>
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Program"} navigate={() => (0)} styling={buttonStyle}/>
                        <CancelButton/>
                    </>
                }
            </form>
        </div>
    )
}

export default ProgramForm