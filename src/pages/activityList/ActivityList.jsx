import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import Layout from "../../components/layout/Layout"
import { AiOutlinePlus } from 'react-icons/ai';

const ActivityList = () => {
    return(
        <div className="container py-3">
            <h1 className="mt-2">SMM ITDP Batch 3</h1>
            <hr/>
            <div className="row">
                <div className="col-md-9">      
                    <div className="mt-4">
                        <Button title={"Add Activity"}/>
                    </div>
                    <h4 className="mt-4">Thursday, 25 Mei 2023</h4>
                    <div style={{ marginTop: "1.5rem" }}> {/* Tambahkan properti style pada Card yang ingin diberikan margin top */}
                    <Card title={"Kickoff ITDP SMM Batch 3"} isActivity={true}/>
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

export default Layout(ActivityList)