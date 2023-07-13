import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import SearchBar from "../../components/searchbar/Searchbar"
import ProgramCard from "./ProgramCard"
import { useEffect, useState } from "react"
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdb-react-ui-kit'
import { useAuth } from "../../hooks/useAuth"
import useProgram from "./useProgram"
import axiosInstance from "../../services/axios-client"
import { toast } from "react-toastify"
import debounce from "lodash.debounce"

import AsyncSelect from 'react-select/async';

const ProgramList = () => {
    const navigate = useNavigate()
    const {program, getPrograms, getMenteeCandidate} = useProgram()
    const [name, setName] = useState("")
    const {getCurrentUser} = useAuth()
    const [isModalOut, setIsModalOut] = useState(false)
    const [allSelectedParticipants, setAllSelectedParticipants] = useState([]);
    const [defaultSelect, setdefaultSelect] = useState([])
    const [programId, setProgramId] = useState('')
    const [index, setIndex] = useState(0)
    const [programName, setProgramName] = useState('')
    const [filteredProgram, setFilteredProgram] = useState({
        admin: [],
        panelist: [],
        mentor: [],
        participant: []
    })

    const toggleShow = async (id) => {
        setIsModalOut(!isModalOut)
        setProgramId(id)
    }

    const assignParticipantToProgram = async (e) => {
        e.preventDefault()
        for (const select of allSelectedParticipants) {
            try {
                let payload = {
                    ProgramId: programId,
                    UserId : select.value
                }
                let res = await axiosInstance.post("participants", payload)
                if (res.status === 200){
                    toast(`${select.label} successfully added to ${program.admin.find((v)=> v.ID === programId).Name}`)
                }
            } catch (error) {
                toast.error(error.response.data.status.description)
            }
        }
        setProgramId("")
        setAllSelectedParticipants([])
        await getPrograms()
        setIsModalOut(false)
    }


    const searchParticipant = async (inputValue) => {
        if (programId)
            try {
                const data = await  getMenteeCandidate(programId, inputValue)
                return data.map((v)=> ({value: v.ID, label: `${v.FirstName} ${v.LastName}`}))
            } catch (error) {
                
            }
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

    const cardStyle = {
        top : '0.5rem',
        bot : '0.5rem'
    }

    useEffect(()=>{
          getPrograms()
    }, [])

    useEffect(()=>{
        const getDefault = async () => {
            const data = await searchParticipant("")
            setdefaultSelect(data)
        }
        if(programId)
            getDefault()
    }, [programId])

    useEffect(()=>{  
        setName(getCurrentUser().FirstName)
    }, [getCurrentUser])

    useEffect(()=>{
        console.log(allSelectedParticipants)
    },[allSelectedParticipants])

    useEffect(()=> {
        const debounceFilter = debounce(()=>{
            if(program){
                let filtered = JSON.parse(JSON.stringify(program))
                filtered.admin = program.admin?.filter((e)=> e.Name.toLowerCase().includes(programName))
                filtered.panelist = program.panelist?.filter((e)=> e.Name.toLowerCase().includes(programName))
                filtered.mentor = program.mentor?.filter((e)=> e.Name.toLowerCase().includes(programName))
                filtered.participant = program.participant?.filter((e)=> e.Name.toLowerCase().includes(programName))
                console.log(filtered)
                setFilteredProgram(filtered)
            }
        }, 500)
        if(programName){
        debounceFilter()
        } else setFilteredProgram(program)
    },[program, programName])

    console.log(program)
    return(
        <>
            <div className="container py-5 px-5 mb-5">
                <h2><b>Hello, {name}!</b></h2>
                <SearchBar onChange={setProgramName}/>
                <div className="mt-4 mb-4">
                    <Button title={" + Add Program "} navigate={() => navigate('/program/program-form')}/>
                </div>
                {program?.admin ? 
                <>
                {filteredProgram.admin.map((v, i)=>(<ProgramCard key={`admin${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} isAdmin={true} toogleModalUpdate={()=>toggleShow(i)} participant={v.participants}/>))}
                </>
                : <></>}
                {program?.panelist ? 
                <>
                <h3 style={{ marginTop: "2rem"}}>Panelist</h3>
                {filteredProgram.panelist.map((v)=>(<ProgramCard key={`panelist${v.ID}`} title={v.Name} styling={cardStyle} isJudge={true} programId={v.ID} participant={v.participants} toogleModalUpdate={toggleShow}/>))}
                </>
                : <></>}
                {program?.mentor ? 
                <>
                <h3 style={{ marginTop: "2rem"}}>Mentor</h3>
                {filteredProgram.mentor.map((v)=>(<ProgramCard key={`mentor${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} participant={v.participants} toogleModalUpdate={toggleShow}/>))}
                </>
                : <></>}
                {program?.participant ? 
                <>
                <h3 style={{ marginTop: "2rem"}}>Mentee</h3>
                {filteredProgram.participant.map((v)=>(<ProgramCard key={`participant${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID} participant={v.participants} toogleModalUpdate={toggleShow}/>)) }
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
                            <Button title={"Cancel"} navigate={(e)=> toggleShow("")} styling={buttonCancelStyle}/>
                            <Button title={"Confirm"} navigate={(e)=> assignParticipantToProgram(e)}/>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default ProgramList