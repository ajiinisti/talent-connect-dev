import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import SearchBar from "../../components/searchbar/Searchbar"
import ProgramCard from "./ProgramCard"
import { useEffect, useState } from "react"
import { DefaultProfileIcon } from "../../assets"
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdb-react-ui-kit'

const ProgramList = () => {
    const navigate = useNavigate()
    const [isModalOut, setIsModalOut] = useState(false)
    const [allParticipantList, setAllParticipantList] = useState([])
    const [allSelectedParticipants, setAllSelectedParticipants] = useState(null);
    console.log(allSelectedParticipants)

    const toggleShow = () => {
        setIsModalOut(!isModalOut)
    }

    const assignParticipantToProgram = (e) => {
        e.preventDefault()
    }

    const handleCheckboxChange = (index) => {
        const updatedParticipants = [...allSelectedParticipants];
        updatedParticipants[index].selected = !updatedParticipants[index].selected;
        setAllSelectedParticipants(updatedParticipants);
    };

    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        marginLeft: '1rem'
    }

    const cardStyle = {
        top : '0.5rem',
        bot : '0.5rem'
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
            <div className="container px-5">
                <h1 className="mt-5"><b>Hello, Admin!</b></h1>
                <SearchBar/>
                <div className="mt-4 mb-4">
                    <Button title={" + Add Program "} navigate={() => navigate('/program/program-form')}/>
                </div>
                <ProgramCard title={"ITDP SMM Batch 3"} styling={cardStyle} toogleModalUpdate={toggleShow}/> 
                <ProgramCard title={"ITDP SMM Batch 2"} styling={cardStyle} toogleModalUpdate={toggleShow}/>
                <ProgramCard title={"ITDP SMM Batch 1"} styling={cardStyle} toogleModalUpdate={toggleShow}/>
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
                        <Button title={"Confirm"} navigate={(e)=> assignParticipantToProgram(e)}/>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default ProgramList