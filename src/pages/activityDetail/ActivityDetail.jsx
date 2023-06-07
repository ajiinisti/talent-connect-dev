// import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import { BsArrowLeft } from "react-icons/bs"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios-client"

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
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9 mr-3">      
                    <h4 className="mt-4 mb-4"><BsArrowLeft/>   {activity?.Name}</h4>
                    <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Link</label>
                            <b><span>{activity?.Link}</span></b>
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
                    <h5 className="mt-4 mb-4">Participants (6)</h5>
                    <div className="mt-3">
                        <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    </div>
                    <div className="mt-3">
                        <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>Ariel Nathania</span>
                    </div>
                    <div className="mt-3">
                        <img src={DefaultProfileIcon} alt="Profile Icon" /> <span>Aji Inisti Udma Wijaya</span>
                    </div>
                    <div className="mt-3 align-item-center">
                        <button className="add-participant-button">+  Add Participant</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityDetail