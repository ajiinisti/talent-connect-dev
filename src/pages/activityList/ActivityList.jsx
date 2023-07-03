import { useNavigate, useParams } from "react-router-dom"
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
        <>
            <div className="row">
                <div className="col">      
                    <div className="mt-4">
                        <Button title={"+ Add Activity"} navigate={() => navigate(`/program/${params.programId}/activity-form`)}/>
                    </div>
                    
                    {activities?.map((activity)=>(
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
            </div>
        </>
    )
}

export default ActivityList