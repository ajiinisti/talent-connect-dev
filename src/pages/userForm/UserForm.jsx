import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';

const UserForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const typeOptions = [
        { value: 'mentee', label: 'Mentee' },
        { value: 'mentor', label: 'Mentor' },
        { value: 'judge', label: 'Judge' }
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
        <div className="container mt-4 px-4">
            <h1><BsArrowLeft/><b>
                {
                    isUpdate ? " Edit User": " Add User"
                }
            </b></h1>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control evaluation-aspect-form " id="name" placeholder="Enter title"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control evaluation-aspect-form " id="email" placeholder="Enter title"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="form-label">Role</label>
                    <Select options={typeOptions} id="role" placeholder="Select role"/>
                </div>
                {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} navigate={() => (0)}/>
                        <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                    </>: 
                    <>
                        <Button title={"Add Evaluation Aspect"} navigate={() => (0)}/>
                        <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                    </>
                }
            </form>
        </div>
    )
}

export default UserForm