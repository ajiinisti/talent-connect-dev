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
import { useParams } from "react-router-dom"
import useAssignList from "./useAssignList"

const UserAssignListOfUserProgram = () => {
    const [isModalOut, setIsModalOut] = useState(false)
    const params = useParams()
    const {participants, getParticipants, getMentee, assigned, 
        allSelectedParticipants, setAllSelectedParticipants, postMentee, program, getEvaluatee, postPanelist} = useAssignList()
    
    const isMentor = params.role === "mentor"
    const isPanelist = params.role === "panelist"

    const handleCheckboxChange = (index) => {
        const updatedParticipants = [...allSelectedParticipants];
        updatedParticipants[index].selected = !updatedParticipants[index].selected;
        setAllSelectedParticipants(updatedParticipants);
    };

    const toggleShow = (e) => {
        if(e)
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
            postMentee(params.id, params.programId, allSelectedParticipants.filter((v)=>v.selected), toggleShow)
        }
        if (isPanelist) {
            postPanelist(params.id, allSelectedParticipants.filter((v)=>v.selected), toggleShow)
        }
        e.preventDefault()
    }

    useEffect(()=>{
        getParticipants(params.programId)
        if(isMentor){
            getMentee(params.id, params.programId)
        }
        if(isPanelist){
            getEvaluatee(params.id, params.programId)
        }  
    }, [])

    return(
        <>
            <div className="container py-5 px-5 mb-5">
                <h2><ArrowButton/><b>{program.Name}</b></h2>
                <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    {assigned.map((v)=>(
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                            <img src={DefaultProfileIcon} alt="Profile Icon" style={{width:"5%", marginRight:"2rem"}}/> 
                            <span style={{ fontSize: '20px'}}>{v.name}</span>
                            <button className="btn" style={{ marginLeft: 'auto', marginBottom: '0.5rem' }}><BsTrash3/> </button>
                        </div>
                    ))}
                    <Button title={isMentor ? "+ Add Mentee" : "+ Add Panelist"} navigate={(e) => toggleShow(e)}/>
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
                        <Button title={"Confirm"} navigate={(e)=> assignMenteetoUser(e)}/>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default UserAssignListOfUserProgram