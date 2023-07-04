import { useEffect } from "react"
import { DefaultProfileIcon } from "../../assets"
import useParticipants from "./useParticipants"

const Participants = ({program}) => {
    const{getAllMentorMentee, mentor} = useParticipants()
    useEffect(() => {
        getAllMentorMentee(program?.participants)
    })
    return(
        <div className="col-md-3">
            <h5 className="mt-4 mb-4">Mentors ({mentor ? mentor.length : 0})</h5>
            {mentor && mentor.map((v)=>(
                <div className="mt-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.Name}</span>
                </div>
            ))}
            <h5 className="mt-4 mb-4">Mentees ({program?.participants ? program?.participants.length : 0})</h5>
            {program?.participants && program?.participants.map((v)=>(
                <div className="mt-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                </div>
            ))}
        </div>
    )
}

export default Participants