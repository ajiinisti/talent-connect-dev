import { MDBCol, MDBListGroup, MDBListGroupItem, MDBRow, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { DefaultProfileIcon } from "../../assets";
import ArrowButton from "../../components/button/ArrowButton";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Feedback from "./Feedback";
import FeedbackForm from "./FeedbackForm";

const MentorFeedback = () => {
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

  const [basicActive, setBasicActive] = useState("title");

  const handleBasicClick = (value) => {
    if (value === basicActive) return;

    setBasicActive(value);
  };

  const items = [
    {
        id: 1,
        img: DefaultProfileIcon,
        name: "Aji Inisti Udma Wijaya",
        date: "12 Juni 2023",
        mentor: "Mentor",
        feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolores quod natus perspiciatis iure nobis doloribus quasi magnam et culpa est, animi voluptatibus."
    },
    {
        id: 2,
        img: DefaultProfileIcon,
        name: "Ariel Nathania",
        date: "20 Juni 2023",
        mentor: "Mentor",
        feedback: "Lorem pariatur labore alias dolores quod natus perspiciatis iure nobis doloribus animi voluptatibus."
    },
    {
        id: 3,
        img: DefaultProfileIcon,
        name: "Alwin",
        date: "",
        mentor: "Mentor",
        feedback: ""
    }
  ]

  return (
    <div className="container py-5 px-5 mb-5">
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="mt-2">
                <ArrowButton />
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
                        items.map((mentee) => (
                            <MDBListGroupItem
                                action
                                active={basicActive === mentee.id}
                                noBorders
                                className="px-3"
                            >
                                <div onClick={() => handleBasicClick(mentee.id)}>
                                    <img
                                        src={mentee.img}
                                        alt="Profile Icon"
                                        className="image"
                                        style={{ width: "10%", marginRight: "1rem" }}
                                    />
                                    <span>{mentee.name}</span>
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
                                <h1>0</h1>
                                <span>feedback given</span>
                            </div>
                            <div style={{ ...rectangleStyle, maxWidth: "15vh" }}>
                                <h1>4</h1>
                                <span>empty feedback</span>
                            </div>
                        </div>
                    </MDBTabsPane>
                    {
                        items.map((mentee) => {
                            if (mentee.feedback === "") {
                                return (
                                    <MDBTabsPane key={mentee.id} show={basicActive === mentee.id}>
                                        <FeedbackForm id={mentee.id} name={mentee.name}/>
                                    </MDBTabsPane>
                                );
                            } else {
                                return (
                                    <MDBTabsPane key={mentee.id} show={basicActive === mentee.id}>
                                        <Feedback 
                                            name={mentee.name} 
                                            mentor={mentee.mentor} 
                                            feedback={mentee.feedback} 
                                            date={mentee.date} 
                                            image={DefaultProfileIcon}
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
