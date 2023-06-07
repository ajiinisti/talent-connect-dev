import { useNavigate, useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios-client"

// TODO : ActivityList Group By Date
const ActivityList = () => {
    const navigate = useNavigate()
    const [program, setProgram] = useState()
    const [activities, setActivities] = useState()
    const param = useParams()

    // group activity based on start Date

    useEffect(()=>{
        const getActivity = async () => {
            try{
                let res = await axiosInstance.get(`/programs/${param.id}`)
                if (res.status === 200) {
                    setProgram(res.data.data)
                    let activity = res.data.data?.activity.map((v)=>{

                    })
                }
            } catch(e) {
                console.log(e);
            }
        }
        getActivity()
    }, [])

    const cardStyle = {
        top : '1.5rem',
        bot : '1.5rem'
    }

    return(
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>{program?.Name}</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9">      
                    <div className="mt-4">
                        <Button title={"+ Add Activity"} navigate={() => navigate('/program/activity-form')}/>
                    </div>
                    <h4 className="mt-4">Thursday, 25 Mei 2023</h4>
                    <div style={{ marginTop: "1.5rem" }}>
                        <ActivityCard title={"Kickoff ITDP SMM Batch 3"} styling={cardStyle}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="mt-4 mb-4">Participants ({program?.participants ? program.participants.length : 0})</h5>
                    {program?.participants ?
                    program.participants.map((v) => ( 
                    <div className="mt-3">
                        <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                    </div>)) : <></>
                    }
                    <div className="mt-3 align-item-center">
                        <button className="add-participant-button">+  Add Participant</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityList