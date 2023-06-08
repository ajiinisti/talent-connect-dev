import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';
import CancelButton from "../../components/button/CancelButton";
import ArrowButton from "../../components/button/ArrowButton";
import useUser from "./useUserForm";

const UserForm = () => {
    const params = useParams()
    const {payload, selectedOption, onSelectChange, options, getRole, handleSubmit, onChangeHandle, getUser} = useUser()
    const [isUpdate, setUpdate] = useState(false)
    // const typeOptions = [
    //     { value: 'mentee', label: 'Mentee' },
    //     { value: 'mentor', label: 'Mentor' },
    //     { value: 'judge', label: 'Judge' }
    // ]

    useEffect(()=> {
        if(params.id) {
            getUser(params.id)
            setUpdate(true)
        }
    },[params.id])
    useEffect(()=>{
        getRole()
    }, [])

    return(
        <div className="container py-5 px-5 mb-5">
            <h1><ArrowButton/><b>
                {
                    isUpdate ? " Edit User": " Add User"
                }
            </b></h1>
            <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}} onSubmit={(e)=> handleSubmit(e, isUpdate)}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control evaluation-aspect-form " value={payload.Name} onChange={(e)=>onChangeHandle(e)} id="name" name="Name" placeholder="Enter name"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control evaluation-aspect-form " value={payload.Email} onChange={(e)=>onChangeHandle(e)} id="email" name="Email" placeholder="Enter email"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="form-label">Role</label>
                    <Select options={options} id="role" value={selectedOption} placeholder="Select role" onChange={(e)=>onSelectChange(e) }/>
                </div>
                    <Button title={ isUpdate ? "Save Changes" : "Add User"}/>
                    <CancelButton/>
            </form>
        </div>
    )
}

export default UserForm