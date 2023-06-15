import { useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import { useEffect, useState } from "react"
import ArrowButton from "../../components/button/ArrowButton"
import useActivityDetail from "./useActivityDetail"
import Participants from "../../components/participants/Participants"

const ActivityDetail = () => {
    const params = useParams()
    const {activity, getDetailActivity, getDetailMonitoring, getPrograms, participants, programName} = useActivityDetail()

    useEffect(()=>{
        if(params.programId){
            getPrograms(params.programId)
        }
        if (params.isMentoring === "true") {
            getDetailMonitoring(params.id)
        } else{
            getDetailActivity(params.id)
        }
    }, [])

    return(
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><b>{activity.program?.Name ? activity.program?.Name : programName}</b></h2>
            <hr/>
            <div className="row">
                <div className="col-md-9 mr-3">      
                    <h4 className="mt-4 mb-4"><ArrowButton/>   {activity?.Name}</h4>
                    <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Link</label>
                            <b><span>{activity?.Link ? <a target="_blank" rel="noopener noreferrer" href={activity?.Link}> {activity?.Link}</a> : <div>-</div> } </span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Date</label>
                            <b><span>{new Date(activity?.StartDate).toLocaleString('id-ID')}</span></b>
                        </div>
                        {
                            params.isMentoring === "true" ?
                            <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                                <label style={{ display: 'inline-block'}}>Participants</label>
                                <b><span>{activity.Participants}</span></b>
                            </div>
                            :
                            <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                                <label style={{ display: 'inline-block'}}>Participants</label>
                                <b><span>All</span></b>
                            </div>
                        }
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Description</label>
                            <b><span>{activity?.Description}</span></b>
                        </div>
                    </div>
                </div>
                <Participants participants={participants}/>
            </div>
        </div>
    )
}

export default ActivityDetail