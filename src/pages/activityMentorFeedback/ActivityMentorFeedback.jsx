import { MDBCol, MDBListGroup, MDBListGroupItem, MDBRow, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { DefaultProfileIcon } from "../../assets";
import ArrowButton from "../../components/button/ArrowButton";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Feedback from "./Feedback";
import FeedbackForm from "./FeedbackForm";
import useFeedback from "./useFeedback";
import { useParams } from "react-router-dom";

const MentorFeedback = () => {
    const params = useParams()
    const { fetchMentee, feedbackData, feedback, postFeedback } = useFeedback()
    const [basicActive, setBasicActive] = useState("title");
    const [comment, setComment] = useState("")

    const handleInputChange = (e) => {
        const value = e.target.value    
        setComment(value)
    }
        
    const rectangleStyle = {
        border: "1px solid #d3d3d3",
        borderRadius: "10px",
        height: "18vh",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        padding: "5px 5px 5px 5px",
        marginRight: "1vh",
    };

    const handleBasicClick = (value) => {
        if (value === basicActive) return;
        setBasicActive(value);
    };

    const sendFeedback = (Comment, MentorMenteeID, MentoringScheduleID) => {
        const today = new Date();
        postFeedback({
            Comment: Comment,
            Date: today,
            MentorMenteeID,
            MentoringScheduleID
        })
    }

    useEffect(() => {
        fetchMentee(params.id)
        console.log(feedbackData)
    }, [])

    console.log("ini comment: ",comment)
    return (
        <div className="container py-5 px-5 mb-5">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h2 className="mt-2">
                    <ArrowButton isTwoSection={true}/>
                    <span style={{ marginLeft: "0.5rem" }}>Feedback</span>
                </h2>
                <div style={{ marginLeft: "5rem", marginTop: "0" }}>
                    <span>SMM ITDP Batch 3</span>
                </div>
            </div>

            <div className="row">
                <div className="flex flex-wrap">
                <hr />
                <MDBRow>
                    <MDBCol size={5}>
                    <div>
                        <MDBListGroup light small>
                        <h5 className="mt-4 mb-4">Mentees</h5>
                        {
                            feedbackData.map((menteeMentorSchedule) => (
                                <MDBListGroupItem
                                    action
                                    active={basicActive === menteeMentorSchedule.ID}
                                    noBorders
                                    className="px-3"
                                >
                                    <div onClick={() => handleBasicClick(menteeMentorSchedule.ID)}>
                                        <img
                                            src={menteeMentorSchedule.Img}
                                            alt="Profile Icon"
                                            className="image"
                                            style={{ width: "40px", marginRight: "1rem" }}
                                        />
                                        <span>{menteeMentorSchedule.Name}</span>
                                        <BsChevronRight style={{ marginLeft: "2vh" }} />
                                    </div>
                                </MDBListGroupItem>
                            ))
                        }
                        </MDBListGroup>
                    </div>
                    </MDBCol>

                    <MDBCol size={7}>
                    <MDBTabsContent>
                        <MDBTabsPane show={basicActive === "title"}>
                            <h5 className="mt-4 mb-4">1-on-1 Mentoring</h5>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <div style={{ ...rectangleStyle, maxWidth: "15vh" }}>
                                    <h1>{feedback.given}</h1>
                                    <span>feedback given</span>
                                </div>
                                <div style={{ ...rectangleStyle, maxWidth: "15vh" }}>
                                    <h1>{feedback.empty}</h1>
                                    <span>empty feedback</span>
                                </div>
                            </div>
                        </MDBTabsPane>
                        {
                            feedbackData.map((menteeMentorSchedule) => {
                                if (menteeMentorSchedule.Comment === "") {
                                    return (
                                        <MDBTabsPane key={menteeMentorSchedule.ID} show={basicActive === menteeMentorSchedule.ID}>
                                            <FeedbackForm 
                                                id={menteeMentorSchedule.ID} 
                                                name={menteeMentorSchedule.Name}
                                                setComment={handleInputChange}
                                                navigate={() => sendFeedback(comment, menteeMentorSchedule.MentorMenteeID, menteeMentorSchedule.MentoringScheduleID)}
                                            />
                                        </MDBTabsPane>
                                    );
                                } else {
                                    return (
                                        <MDBTabsPane key={menteeMentorSchedule.ID} show={basicActive === menteeMentorSchedule.ID}>
                                            <Feedback 
                                                name={menteeMentorSchedule.Name} 
                                                mentor={menteeMentorSchedule.Mentor} 
                                                feedback={menteeMentorSchedule.Comment} 
                                                date={menteeMentorSchedule.Date} 
                                                image={menteeMentorSchedule.Img}
                                            />
                                        </MDBTabsPane>
                                    );
                                }
                            })
                        }

                    </MDBTabsContent>
                    </MDBCol>
                </MDBRow>
                </div>
            </div>
        </div>
    );
};

export default MentorFeedback;
