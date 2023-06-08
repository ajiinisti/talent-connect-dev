import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from 'react-select';
import ArrowButton from "../../components/button/ArrowButton";
import CancelButton from "../../components/button/CancelButton";
import { useAuth } from "../../hooks/useAuth";
import useActivityForm from "./useActivityForm";

const ActivityForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const {getCurrentRole, getCurrentUser} = useAuth()
    const role = getCurrentRole()
    const isAdmin = role.includes("admin")
    const isMentor = role.includes("mentor")
    // const isAdmin = true
    // const isMentor = false

    const {
        activity,
        setActivity,
        participants,
        handleSelectParticipant,
        fetchMentorMentee,
        fetchActivityProgram,
        fetchActivityMentoring,
        postMentoringSchedule,
        postActivity,
        putMentoringSchedule,
        putActivity,
    } = useActivityForm()

    const buttonPost = isMentor ? postMentoringSchedule: postActivity
    const buttonSave = isMentor ? putMentoringSchedule : putActivity

    const handleInputChange = (e) => {
        const target = e.target
        const value = target.type === "datetime-local"? target.value :target.value;
        const name = target.name
    
        setActivity({
            ...activity,
            [name]: value
        });
        console.log(activity)
    }

    useEffect(()=> {
        if(params.id) {
            setUpdate(true)
            if (isMentor) {
                fetchActivityMentoring(params.id)
            } else {
                fetchActivityProgram(params.id)
            }
        }
    },[params.id])

    useEffect(() => {
        if (isMentor) {
            fetchMentorMentee(getCurrentUser().ID)
        } 
    }, [])

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><ArrowButton/>
                {
                    isUpdate ? " Edit Activity": " Add Activity"
                }
                </h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="activityTitle" className="form-label">Title</label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control" 
                            id="activityTitle" 
                            placeholder="Enter title" 
                            value={activity.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input 
                            type="link" 
                            name="link" 
                            className="form-control" 
                            id="link" 
                            placeholder="Enter Link"
                            value={activity.link}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="form-label">Start Date</label>
                        <input type="datetime-local" 
                            className="form-control" id="date" 
                            name="startDate"
                            placeholder="DD/MM/YYYY"
                            value={activity.startDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        isAdmin ?
                        <div className="mb-4">
                            <label htmlFor="participant" className="form-label">Participant</label>
                            <input disabled="disabled" type="participant" className="form-control" id="participant" placeholder="All"/>
                        </div> : <></>
                    }
                    {
                        isMentor ?
                        <div className="mb-4">
                            <label htmlFor="participant" className="form-label">Participant</label>
                            <Select
                                isMulti
                                name="participant"
                                options={participants}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectParticipant}
                                value={activity.participant}
                            />
                        </div> : <></>
                    }
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            rows="5" 
                            id="description" 
                            name="description" 
                            className="form-control" 
                            placeholder="Description"
                            value={activity.description}
                            onChange={handleInputChange}
                            >
                        </textarea>
                    </div>
                    {
                    isUpdate ? 
                    <>
                        <Button title={"Save Changes"} navigate={(e) => 
                            {
                                e.preventDefault();
                                buttonSave(activity, params.programId);
                            }
                        }/>
                        <CancelButton/>
                    </>: 
                    <>
                        <Button title={"Add Activity"} navigate={(e) => 
                            {
                                e.preventDefault();
                                buttonPost(activity, params.programId);
                            }
                        }/>
                        <CancelButton/>
                    </>
                }
                </form>
            </div>
        </div>
    )
}

export default ActivityForm