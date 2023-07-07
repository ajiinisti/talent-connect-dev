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
import AsyncSelect from 'react-select/async';
import axiosInstance from "../../services/axios-client"

const UserAssignListOfUserProgram = () => {
    const [isModalOut, setIsModalOut] = useState(false)
    const params = useParams()
    const {participants, getParticipants, getMentee, assigned, 
        allSelectedParticipants, setAllSelectedParticipants, postMentee, program, getEvaluatee, postPanelist} = useAssignList()
    const [defaultSelect, setDefaultSelect] = useState([])

    
    const isMentor = params.role === "mentor"
    const isPanelist = params.role === "judges"
    
    const searchParticipant = async (inputValue) => {
        if (isPanelist){
            const data = await getEvaluatee(params.id, params.programId, inputValue)
            return data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`}))
        }
        if(isMentor){  
            const data = await getMentee(params.id, params.programId, inputValue)
            return data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`}))
        }
    }
    const toggleShow = (e) => {
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
            postMentee(params.id, params.programId, allSelectedParticipants, toggleShow)
        }
        if (isPanelist) {
            postPanelist(params.id, allSelectedParticipants, toggleShow)
        }
        e.preventDefault()
    }

    useEffect(()=>{
        const getData = async () => {
            if(isPanelist){  
                const data = await getEvaluatee(params.id, params.programId, "")
                setDefaultSelect( data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`})) )
            }
            if(isMentor){  
                const data = await getMentee(params.id, params.programId, "")
                setDefaultSelect( data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`})) )
            }

        }
        if(isModalOut){
            getData()
        }
    }, [isModalOut])

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
                    {assigned.map((v, i)=>(
                        <div key={`user${i}`} style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                            <img src={DefaultProfileIcon} alt="Profile Icon" style={{width:"5%", marginRight:"2rem"}}/> 
                            <span style={{ fontSize: '20px'}}>{v.name}</span>
                            <button className="btn" style={{ marginLeft: 'auto', marginBottom: '0.5rem' }}><BsTrash3/> </button>
                        </div>
                    ))}
                    <Button title={isMentor ? "+ Add Mentee" : "+ Add Panelist"} navigate={toggleShow}/>
                </div>
            </div>
        
            <MDBModal show={isModalOut} setShow={setIsModalOut} >
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <div className="container" style={{ alignContent: 'flex-start'}}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ marginBottom: '1.5rem' }}>Add Participant</h4>
                                
                                <AsyncSelect
                                            isMulti
                                            defaultOptions={defaultSelect}
                                            loadOptions={searchParticipant}
                                            onChange={setAllSelectedParticipants}
                                        />
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