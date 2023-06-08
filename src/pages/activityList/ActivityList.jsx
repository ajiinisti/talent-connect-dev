import { useNavigate, useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import ActivityCard from "./ActivityCard"
import { useEffect } from "react"
import useActivityList from "./useActivityList"
import { useAuth } from "../../hooks/useAuth"

// TODO : ActivityList Group By Date
const ActivityList = () => {
    const navigate = useNavigate()
    const {
        getPrograms,
        programs,
        activities,
        getMentoringActivityByMentorId,
        getMentoringActivityByMenteeId,
        mentoring
    } = useActivityList()
    const {getCurrentRole, getCurrentUser} = useAuth()
    const role = getCurrentRole()
    const params = useParams()

    // group activity based on start Date
    useEffect(()=>{
        getPrograms(params.programId)
        if (role.includes("mentor")) {
            getMentoringActivityByMentorId(getCurrentUser().ID)
        }
        if (role.includes("participant")) {
            getMentoringActivityByMenteeId(getCurrentUser().ID)
        }
    }, [])

    const cardStyle = {
        top : '1.5rem',
        bot : '1.5rem'
    }

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-2"><b>{programs?.Name}</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9">      
                    <div className="mt-4">
                        <Button title={"+ Add Activity"} navigate={() => navigate(`/program/${params.programId}/activity-form`)}/>
                    </div>
                    
                    {!role.includes("mentor") && activities?.map((activity)=>(
                        <div key={activity.Date}>
                            <h4 className="mt-4">{activity.Date}</h4>
                            {activity.Activities?.map((v)=>(
                                <div style={{ marginTop: "1.5rem" }}>
                                    <ActivityCard title={v.Name} styling={cardStyle} activity={v} programId={params.programId} isMentoring={false}/>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="mt-5">
                        <h3>Mentoring</h3>
                        <hr/>
                        {mentoring?.map((m)=>(
                            <div key={m}>
                            <h4 className="mt-4">{m.FormattedDate}</h4>
                            <div style={{ marginTop: "1.5rem" }}>
                                <ActivityCard title={m.Name} styling={cardStyle} activity={m} programId={params.programId} isMentoring={true}/>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="mt-4 mb-4">Participants ({programs?.participants ? programs.participants.length : 0})</h5>
                    {programs?.participants ?
                    programs.participants.map((v) => ( 
                    <div className="mt-3">
                        <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                    </div>)) : <></>
                    }
                    {/* <div className="mt-3 align-item-center">
                        <button className="add-participant-button">+  Add Participant</button>
                    </div>  */}
                </div>
            </div>
        </div>
    )
}

export default ActivityList