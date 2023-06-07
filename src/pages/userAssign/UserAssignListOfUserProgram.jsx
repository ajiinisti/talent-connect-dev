import { BsTrash3 } from "react-icons/bs"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdb-react-ui-kit'
import { useEffect, useState } from "react"
import ArrowButton from "../../components/button/ArrowButton"

const UserAssignListOfUserProgram = () => {
    const isMentor = true
    const [isModalOut, setIsModalOut] = useState(false)
    const [allParticipantList, setAllParticipantList] = useState([])
    const [allSelectedParticipants, setAllSelectedParticipants] = useState(null);
    console.log(allSelectedParticipants)

    const handleCheckboxChange = (index) => {
        const updatedParticipants = [...allSelectedParticipants];
        updatedParticipants[index].selected = !updatedParticipants[index].selected;
        setAllSelectedParticipants(updatedParticipants);
    };

    const toggleShow = (e) => {
        e.preventDefault()
        setIsModalOut(!isModalOut)
    }

    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        marginLeft: '1rem'
    }

    const assignMenteetoUser = (e) => {
        if (isMentor) {
            
        }
        e.preventDefault()
    }

    useEffect(() => {
        setAllParticipantList([
            { name: "Aji Inisti", profilePicture: DefaultProfileIcon},
            { name: "Alwin Ihza", profilePicture: DefaultProfileIcon},
            { name: "Ariel Nathania", profilePicture: DefaultProfileIcon},
        ])
    }, []);

    useEffect(() => {
        const initialParticipant = allParticipantList.map((participant) => ({
          ...participant,
          selected: false,
        }));
        setAllSelectedParticipants(initialParticipant);
    }, [allParticipantList]);

    return(
        <>
            <div className="container py-5 px-5 mb-5">
                <h2><ArrowButton/><b>SMM ITDP Batch 3</b></h2>
                <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                        <img src={DefaultProfileIcon} alt="Profile Icon" style={{width:"5%", marginRight:"2rem"}}/> 
                        <span style={{ fontSize: '20px'}}>Aji Inisti Udma Wijaya</span>
                        <button className="btn" style={{ marginLeft: 'auto', marginBottom: '0.5rem' }}><BsTrash3/> </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                        <img src={DefaultProfileIcon} alt="Profile Icon" style={{width:"5%", marginRight:"2rem"}}/> 
                        <span style={{ fontSize: '20px'}}>Aji Inisti Udma Wijaya</span>
                        <button className="btn" style={{ marginLeft: 'auto', marginBottom: '0.5rem' }}><BsTrash3/> </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                        <img src={DefaultProfileIcon} alt="Profile Icon" style={{width:"5%", marginRight:"2rem"}}/> 
                        <span style={{ fontSize: '20px'}}>Aji Inisti Udma Wijaya</span>
                        <button className="btn" style={{ marginLeft: 'auto', marginBottom: '0.5rem' }}><BsTrash3/> </button>
                    </div>
                    <Button title={"+ Add Mentee"} navigate={(e) => toggleShow(e)}/>
                </div>
            </div>
        
            <MDBModal show={isModalOut} setShow={setIsModalOut} >
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <div className="container" style={{ alignContent: 'flex-start'}}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ marginBottom: '1.5rem' }}>Add Participant</h4>
                                {
                                    allSelectedParticipants && allParticipantList.map((participant, index)=> (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '10px' }}>
                                                <input
                                                type="checkbox"
                                                checked={allSelectedParticipants[index]?.selected || false}
                                                onChange={() => handleCheckboxChange(index)}
                                                style={{marginRight:'10px'}}
                                                />
                                                <img src={participant.profilePicture} alt="Profile Icon" /> <span>{participant.name}</span>
                                            </label>
                                            <hr/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </MDBModalHeader>
                    <MDBModalFooter>
                        <Button title={"Cancel"} navigate={(e)=> toggleShow(e)} styling={buttonCancelStyle}/>
                        <Button title={"Confirm"} navigate={(e)=> assignMenteetoUser(e)}/>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default UserAssignListOfUserProgram