import { DefaultProfileIcon } from "../../assets"
import ArrowButton from "../../components/button/ArrowButton"

const MentorFeedback = () => {
    // const navigate = useNavigate()

    // const cardStyle = {
    //     top : '1.5rem',
    //     bot : '1.5rem'
    // }

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row">
                <div className="col-md-9 mr-3">      
                    <h4 className="mt-4 mb-4"><ArrowButton/> 1 on 1 Mentoring Feedback</h4>
                    <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div class="container mb-3" style={{
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}>
                        <img src={DefaultProfileIcon} alt="Profile Icon" class="image" style={{width: '7%', marginRight:'1rem'}}/>
                        <div class="content">
                            <div class="name">Aji Inisti</div>
                            <span style={{fontSize: '13px', color: 'gray'}}>12 June 2023</span>
                        </div>
                    </div>
                        <div className="mb-4" style={{ display: 'flex', flexDirection: 'column'}}>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia magni voluptatum quam sed pariatur labore alias dolores quod natus perspiciatis iure nobis doloribus quasi magnam et culpa est, animi voluptatibus.</span>
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
                    {/* <div className="mt-3 align-item-center">
                        <button className="add-participant-button">+  Add Participant</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MentorFeedback