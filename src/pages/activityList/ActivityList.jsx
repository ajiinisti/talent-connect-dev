import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button/Button"
import { useEffect } from "react"
import useActivityList from "./useActivityList"
import { useAuth } from "../../hooks/useAuth"
import Pagination from "./Pagination"

// TODO : ActivityList Group By Date
const ActivityList = () => {
    const navigate = useNavigate()
    const {
        getPrograms,
        activities,
        getMentoringActivityByMentorId,
        getMentoringActivityByMenteeId,
        mentoring,
        combineData,
        allActivities
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

    useEffect(() => {
        combineData()
    }, [mentoring, activities])

    return(
        <div className="row">
            <div className="col">      
                <div className="mt-4">
                    <Button title={"+ Add Activity"} navigate={() => navigate(`/program/${params.programId}/activity-form`)}/>
                </div>
                { allActivities && <Pagination content={allActivities} programId={params.programId}/> }
            </div>
        </div>
    )
}

export default ActivityList