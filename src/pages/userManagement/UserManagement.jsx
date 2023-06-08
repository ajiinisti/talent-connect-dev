import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button"
import UserCard from "./UserCard";
import useUserManagement from './useUserManagement';
import { useEffect } from 'react';

const UserManagement = () => {
    const navigate = useNavigate()
    const {users, getUser} = useUserManagement()

    useEffect(()=>{
        getUser()
    }, [])
    return(
        <div className="py-5 px-5 mb-5">
            <h2>User Management</h2>
            <Button title={"+ Add User"} navigate={() => navigate('/user-management/user-form')}/>
            <div className="mt-4 px-3" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="row mt-4 px-4 py-3">
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
                    <span style={{color:'gray'}}>Active</span>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                <div className="px-3">
                    <hr/>
                </div>
                {
                    users.map((v)=>(
                        <UserCard name={v.FirstName + " " + v.LastName} email={v.Email} role={v.Roles[0].Name} id={v.ID}/>
                    ))
                }
            </div>
        </div>
    )
}

export default UserManagement