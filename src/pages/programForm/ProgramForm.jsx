import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ProgramForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)

    const buttonStyle = {
        height: '40px'
    }

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
    })

    return(
        <div className="container mt-4 px-4">
            <h1><BsArrowLeft/><b>
                {
                    isUpdate ? " Edit Program": " Add Program"
                }
            </b></h1>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="mb-4">
                    <label htmlFor="programTitle" className="form-label">Title</label>
                    <input type="email" className="form-control program-form " id="programTitle" placeholder="Enter title"/>
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
                        <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                    </>: 
                    <>
                        <Button title={"Add Program"} navigate={() => (0)} styling={buttonStyle}/>
                        <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                    </>
                }
            </form>
        </div>
    )
}

export default ProgramForm