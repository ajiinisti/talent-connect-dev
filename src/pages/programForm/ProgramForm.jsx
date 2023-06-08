import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CancelButton from "../../components/button/CancelButton"
import ArrowButton from "../../components/button/ArrowButton"
import useProgramForm from "./useProgramForm"

const ProgramForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const {data, setData, postProgramForm, putProgramForm, fetchData} = useProgramForm()
    

    const handleInputChange = (e) => {
        const target = e.target
        const value = target.type === "date"? target.value+"T00:00:00Z":target.value;
        const name = target.name
    
        setData({
            ...data,
            [name]: value
        });
        console.log(data)
    }

    const buttonStyle = {
        height: '40px'
    }

    useEffect(()=> {
        if(params.id) {
            console.log(params.id)
            setUpdate(true)
            fetchData(params.id).catch((e)=>(console.log(e)))
        }
    },[params.id])

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
                    <input 
                        type="text" 
                        name="name"
                        className="form-control program-form " 
                        id="programTitle" 
                        placeholder="Enter title"
                        value={data.name}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input 
                        type="date" 
                        name="startDate"
                        className="form-control program-form " 
                        id="startDate" 
                        placeholder="DD/MM/YYYY"
                        value={data.startDate.slice(0,10)}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input 
                        type="date" 
                        name="endDate"
                        className="form-control program-form " 
                        id="endDate" 
                        placeholder="DD/MM/YYYY"
                        value={data.endDate.slice(0,10)}
                        onChange={handleInputChange}/>
                </div>
                {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} 
                            navigate={(e) => {
                                e.preventDefault()
                                putProgramForm(data)
                            }} 
                            styling={buttonStyle}/>
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Program"} 
                            navigate={(e) => {
                                e.preventDefault();
                                postProgramForm(data)}
                            } 
                            styling={buttonStyle}/>
                        <CancelButton/>
                    </>
                }
            </form>
        </div>
    )
}

export default ProgramForm