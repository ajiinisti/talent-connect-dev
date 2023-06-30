import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button/Button"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"
import useActivityList from "./useActivityList"
import { useAuth } from "../../hooks/useAuth"
import ArrowButton from "../../components/button/ArrowButton"
import Participants from "../../components/participants/Participants"
import AsyncSelect from 'react-select/async';
import useProgram from "../programList/useProgram"

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
    const {getMenteeCandidate} = useProgram()
    const role = getCurrentRole()
    const params = useParams()
    const [selectShow, setSelectShow] = useState(false)    
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([])
    const [defaultSelect, setDefaultSelect] = useState([])

    useEffect(() => {
        const getDefault = async () => {
            const data = await getMenteeCandidate(params.programId,"")
            setDefaultSelect(data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`})))
        }
        if(selectShow)
            getDefault()
    }, [selectShow])
    

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

    const searchParticipant = async (inputValue) => {
        try {
            const data = await  getMenteeCandidate(params.programId, inputValue)
            return data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`}))
        } catch (error) {
            
        }
    }

    const cardStyle = {
        top : '1.5rem',
        bot : '1.5rem'
    }

    return(
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><ArrowButton/><b>{programs?.Name}</b></h2>
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
                <Participants participants={programs?.participants}>
                       <Button title={selectShow?"Cancel" : "+ Add Participant"} navigate={() => setSelectShow(!selectShow)}/>
                        {selectShow && 
                        <div style={{marginTop: "1.5rem"}}>
                            <AsyncSelect 
                            isMulti
                                defaultOptions={defaultSelect}
                                loadOptions={searchParticipant}
                                onChange={setAllSelectedParticipants}/>
                        </div>
                        }
                </Participants>
            </div>
        </div>
    )
}

export default ActivityList