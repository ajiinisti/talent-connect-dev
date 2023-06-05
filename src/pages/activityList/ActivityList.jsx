import { useNavigate } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"

const ActivityList = () => {
    const navigate = useNavigate()

    const cardStyle = {
        top : '1.5rem',
        bot : '1.5rem'
    }

    return(
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9">      
                    <div className="mt-4">
                        <Button title={"+ Add Activity"} navigate={() => navigate('/program/activity-form')}/>
                    </div>
                    <h4 className="mt-4">Thursday, 25 Mei 2023</h4>
                    <div style={{ marginTop: "1.5rem" }}>
                        <Card title={"Kickoff ITDP SMM Batch 3"} isActivity={true} styling={cardStyle}/>
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

export default ActivityList