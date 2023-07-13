import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button"
import UserCard from "./UserCard";
import useUserManagement from './useUserManagement';
import { useEffect } from 'react';
import SearchBar from '../../components/searchbar/Searchbar';
import Select from 'react-select';
import useUser from '../userForm/useUserForm';

const UserManagement = () => {
    const navigate = useNavigate()
    const {getRole, options} = useUser()
    const {users, getUser, setRole, setName, name, role} = useUserManagement()

    const onChangeSelect = (e) => {
        console.log(e)
        if (e)
            setRole(e.value)
        else setRole(e)
    } 

    useEffect(()=>{
        getUser()
    },[name, role])

    useEffect(()=>{
        getUser()
        getRole()
    }, [])
    
    return(
        <div className="py-5 px-5 mb-5">
            <h2 className='mb-4'><b>User Management</b></h2>
            <div className="mt-4 px-3" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className='d-flex flex-row align-items-center mt-2 px-4 py-3 w-100 gap-2'>
                    <div className='flex-grow-1'>
                        <SearchBar onChange={setName} placeholder={"Search User"}/>
                    </div>
                    <Select isClearable options={options} id="role" placeholder="Select Role" onChange={onChangeSelect}/>
                    <div className='py-3'>
                        <Button title={"+ Add User"} navigate={() => navigate('/user-management/user-form')}/>
                    </div>

                </div>
                <div className="row px-4 py-3">
                    <div className="col-3">
                        <span style={{color:'gray'}}>Name</span>
                    </div>
                    <div className="col-4">
                    <span style={{color:'gray'}}>Email</span>
                    </div>
                    <div className="col-2">
                    <span style={{color:'gray'}}>Role</span>
                    </div>
                    <div className="col-2">
                    {/* <span style={{color:'gray'}}>Active</span> */}
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                <div className="px-3">
                    <hr/>
                </div>
                {
                    users.map((v)=>(
                        <UserCard key={v.ID} name={v.FirstName + " " + v.LastName} email={v.Email} role={v.Roles[0].Name} id={v.ID}/>
                    ))
                } 
            </div>
        </div>
    )
}

export default UserManagement