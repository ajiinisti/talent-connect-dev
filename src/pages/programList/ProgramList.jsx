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
import { useAuth } from "../../hooks/useAuth"
import useProgram from "./useProgram"
import useParticipant from "../../services/useParticipant"

const ProgramList = () => {
    const navigate = useNavigate()
    const {program, getPrograms} = useProgram()
    const {getParticipantList, participants} = useParticipant()
    const [name, setName] = useState("")
    const {getCurrentUser} = useAuth()
    const [isModalOut, setIsModalOut] = useState(false)
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([]);

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

    useEffect(()=>{
          getPrograms()
    }, [])

    useEffect(()=>{  
        setName(getCurrentUser().FirstName)
    }, [getCurrentUser])

    useEffect(() => { 
        getParticipantList("participant")
    }, [])

    useEffect(() => {
        const initialParticipant = participants.map((participant) => ({
          ...participant,
          selected: false,
        }));
        setAllSelectedParticipants(initialParticipant);
    }, [participants]);


    return(
        <>
        <div className="container py-5 px-5 mb-5">
            <h1><b>Hello, {name}!</b></h1>
            <SearchBar/>
            <div className="mt-4 mb-4">
                <Button title={" + Add Program "} navigate={() => navigate('/program/program-form')}/>
            </div>
            {program?.admin ? 
            <>
            {program.admin.map((v)=>(<ProgramCard key={`admin${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} isAdmin={true} toogleModalUpdate={toggleShow}/>))}
            </>
             : <></>}
            {program?.panelist ? 
            <>
            <h2>Panelist</h2>
            {program.panelist.map((v)=>(<ProgramCard key={`panelist${v.ID}`} title={v.Name} styling={cardStyle} isJudge={true} programId={v.ID} toogleModalUpdate={toggleShow}/>))}
            </>
             : <></>}
            {program?.mentor ? 
            <>
            <h2>Mentor</h2>
            {program.mentor.map((v)=>(<ProgramCard key={`mentor${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} toogleModalUpdate={toggleShow}/>))}
            </>
             : <></>}
            {program?.participant ? 
            <>
            <h2>Mentee</h2>
            {program.participant.map((v)=>(<ProgramCard key={`participant${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} toogleModalUpdate={toggleShow}/>)) }
            </>
            : <></>}
        </div>

<MDBModal show={isModalOut} setShow={setIsModalOut} >
    <MDBModalDialog>
    <MDBModalContent>
        <MDBModalHeader>
            <div className="container" style={{ alignContent: 'flex-start'}}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '1.5rem' }}>Add Participant</h4>
                    {
                        allSelectedParticipants && participants.map((participant, index)=> (
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