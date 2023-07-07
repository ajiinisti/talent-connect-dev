import UserAssignCard from "./UserAssignCard"
import ArrowButton from "../../components/button/ArrowButton"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useUserAssign from "./useUserAssign"

const UserAssign = () => {
    const params = useParams()
    const {programs, getPrograms, user, getUser} = useUserAssign()
    const isMentor = params.role === "mentor"

    useEffect(()=>{
        getPrograms()
        getUser(params.id)
    }, [])
    return(
        <div className="container py-5 px-5 mb-5">
            <h2><ArrowButton/><b>
                {
                    isMentor ? "Assign Mentee to Mentor": "Assign Mentee to Judge"
                }
            </b></h2>
            <h4 style={{marginLeft:"2rem"}}>{user.FirstName} {user.LastName}</h4>
            <div className="container">
                {programs.map((v)=>(
                    <UserAssignCard title={v.Name} programId ={v.ID}/>
                ))}
            </div>
        </div>
    )
}

export default UserAssign