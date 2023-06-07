import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button"
import UserCard from "./UserCard";

const UserManagement = () => {
    const navigate = useNavigate()

    return(
        <div className="py-4 px-4">
            <h1>User Management</h1>
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

                <UserCard name={"Aji Inisti"} email={"ajiinisti@gmail.com"} role={"Mentee"}/>
                <UserCard name={"Alwin Ihza"} email={"alwinihza@gmail.com"} role={"Mentor"}/>
                <UserCard name={"Jution"} email={"jutionck@gmail.com"} role={"Judge"}/>
            </div>
        </div>
    )
}

export default UserManagement