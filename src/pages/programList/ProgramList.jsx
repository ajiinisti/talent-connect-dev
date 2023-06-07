import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import SearchBar from "../../components/searchbar/Searchbar"
import ProgramCard from "./ProgramCard"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios-client"
import { useAuth } from "../../hooks/useAuth"

const ProgramList = () => {
    const navigate = useNavigate()
    const [program,setProgram] = useState([])
    const [name, setName] = useState("")
    const {getCurrentUser} = useAuth()

    const cardStyle = {
        top : '0.5rem',
        bot : '0.5rem'
    }

    useEffect(()=>{
          const getPrograms = async () => {
              let res = await axiosInstance.get("auth/programs")
              if (res.status === 200) {
                setProgram(res.data.data)
              } else if (res.status === 401) {
                navigate("/login", {replace:true})
              }
          }
          getPrograms()
          setName(getCurrentUser().FirstName)
    }, [])

    return(
        <div className="container px-5">
            <h1 className="mt-5"><b>Hello, {name}!</b></h1>
            <SearchBar/>
            <div className="mt-4 mb-4">
                <Button title={" + Add Program "} navigate={() => navigate('/program/program-form')}/>
            </div>
            {program?.admin ? 
            <>
            {program.admin.map((v)=>(<ProgramCard key={`admin${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID}/>))}
            </>
             : <></>}
            {program?.panelist ? 
            <>
            <h2>Panelist</h2>
            {program.panelist.map((v)=>(<ProgramCard key={`panelist${v.ID}`} title={v.Name} styling={cardStyle} isJudge={true} programId={v.ID}/>))}
            </>
             : <></>}
            {program?.mentor ? 
            <>
            <h2>Mentor</h2>
            {program.mentor.map((v)=>(<ProgramCard key={`mentor${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID}/>))}
            </>
             : <></>}
            {program?.participant ? 
            <>
            <h2>Mentee</h2>
            {program.participant.map((v)=>(<ProgramCard key={`participant${v.ID}`} title={v.Name} styling={cardStyle} programId={v.ID}/>)) }
            </>
            : <></>}
        </div>
    )
}

export default ProgramList