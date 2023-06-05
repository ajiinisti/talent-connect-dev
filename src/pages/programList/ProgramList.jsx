import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import SearchBar from "../../components/searchbar/Searchbar"
import ProgramCard from "./ProgramCard"

const ProgramList = () => {
    const navigate = useNavigate()

    const cardStyle = {
        top : '0.5rem',
        bot : '0.5rem'
    }

    return(
        <div className="container px-5">
            <h1 className="mt-5"><b>Hello, Admin!</b></h1>
            <SearchBar/>
            <div className="mt-4 mb-4">
                <Button title={" + Add Program "} navigate={() => navigate('/program/program-form')}/>
            </div>
            <ProgramCard title={"ITDP SMM Batch 3"} styling={cardStyle}/> 
            <ProgramCard title={"ITDP SMM Batch 2"} styling={cardStyle}/>
            <ProgramCard title={"ITDP SMM Batch 1"} styling={cardStyle}/>
        </div>
    )
}

export default ProgramList