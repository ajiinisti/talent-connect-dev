import { useNavigate, useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios-client"
import useActivityList from "./useActivityList"

// TODO : ActivityList Group By Date
const ActivityList = () => {
    const navigate = useNavigate()
    const {getPrograms, programs, activities} = useActivityList()
    const params = useParams()
    console.log(activities)

    // group activity based on start Date

    useEffect(()=>{
        getPrograms(params.programId)
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
                    {activities?.map((activity)=>(
                    <div key={activity.Date}>
                    <h4 className="mt-4">{activity.Date}</h4>
                    {activity.Activities?.map((v)=>(
                    <div style={{ marginTop: "1.5rem" }}>
                        <ActivityCard title={v.Name} styling={cardStyle} activity={v} programId={params.programId}/>
                    </div>
                    ))}
                    </div>
                    ))}
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