import { BsArrowLeft } from "react-icons/bs"
import UserAssignCard from "./UserAssignCard"

const UserAssign = () => {
    const isMentor = true

    return(
        <div className="container py-5 px-5 mb-5">
            <h2><BsArrowLeft/><b>
                {
                    isMentor ? "Assign Mentee to Mentor": "Assign Mentee to Judge"
                }
            </b></h2>
            <h4 style={{marginLeft:"2rem"}}>Jution</h4>
            <div className="container">
                <UserAssignCard title={"ITDP SMM BATCH 3"} programId ={"123"}/>
            </div>
        </div>
    )
}

export default UserAssign