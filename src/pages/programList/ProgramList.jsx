import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import SearchBar from "../../components/searchbar/Searchbar"
import useProgramList from "./ProgramFunction"

const ProgramList = () => {
    const navigate = useNavigate()
    const {
        isModalDeleteOpen,
        toggleModal,
        handleDelete
    } = useProgramList()

    const cardStyle = {
        top : '0.5rem',
        bot : '0.5rem'
    }

    return(
        <div className="container px-5">
            <h1 className="mt-5"><b>Hello, Admin!</b></h1>
            <SearchBar/>
            <div className="mt-4 mb-4">
                <Button title={" + Add Program "} navigate={() => navigate('/home/program/program-form')}/>
            </div>
            <Card title={"ITDP SMM Batch 3"} isActivity={false} styling={cardStyle}/> 
            <Card title={"ITDP SMM Batch 2"} isActivity={false} styling={cardStyle}/>
            <Card title={"ITDP SMM Batch 1"} isActivity={false} styling={cardStyle}/>

            {
                isModalDeleteOpen && (  
                <div className="modal-overlay">
                <div className="modal">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to Delete the Program?</p>
                    <div className="modal-buttons">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                </div>
                )
            }
        </div>
    )
}

export default ProgramList