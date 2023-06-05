import { useNavigate } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import { BsArrowLeft } from "react-icons/bs"

const ActivityDetail = () => {
    const navigate = useNavigate()
    const buttonStyle = {
        borderRadius : '5px'
    }

    const cardStyle = {
        top : '1.5rem',
        bot : '1.5rem'
    }

    return(
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9 mr-3">      
                    <h4 className="mt-4 mb-4"><BsArrowLeft/>   KICK OFF ITDP BATCH 3</h4>
                    <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Link</label>
                            <b><span>http://zoom.com</span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Date</label>
                            <b><span>12/12/2023</span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Participants</label>
                            <b><span>All</span></b>
                        </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label style={{ display: 'inline-block'}}>Description</label>
                            <b><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia magni voluptatum quam sed pariatur labore alias dolores quod natus perspiciatis iure nobis doloribus quasi magnam et culpa est, animi voluptatibus.</span></b>
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