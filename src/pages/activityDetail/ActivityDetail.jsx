// import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios-client"
import ArrowButton from "../../components/button/ArrowButton"

const ActivityDetail = () => {
    const params = useParams()
    const [activity, setActivity] = useState({})
    // const navigate = useNavigate()
    // const buttonStyle = {
    //     borderRadius : '5px'
    // }

    // const cardStyle = {
    //     top : '1.5rem',
    //     bot : '1.5rem'
    // }

    useEffect(()=>{
        const getDetail = async () => {
            try {
                let res = await axiosInstance.get("activities/"+params.id)
                if (res.status === 200) {
                    setActivity(res.data.data)
                    console.log(new Date(res.data.data.StartDate).toDateString())
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDetail()
    }, [])

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-2"><b>{activity.program?.Name}</b></h1>
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
                            <b><span>{new Date(activity?.StartDate).toLocaleString('id-ID')} - {new Date(activity?.EndDate).toLocaleString('id-ID')}</span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Participants</label>
                            <b><span>All</span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Description</label>
                            <b><span>{activity?.Description}</span></b>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="mt-4 mb-4">Participants ({activity.program?.participants ? activity.program?.participants.length : 0})</h5>
                    {activity.program?.participants.map((v)=>(
                        <div className="mt-3">
                            <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>{v.User.FirstName} {v.User.LastName}</span>
                        </div>
                    ))}
                    {/* <div className="mt-3 align-item-center">
                        <button className="add-participant-button">+  Add Participant</button>
                    </div>  */}
                </div>
            </div>
        </div>
    )
}

export default ActivityDetail