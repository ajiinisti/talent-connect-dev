import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import Layout from "../../components/layout/Layout"
import SearchBar from "../../components/searchbar/Searchbar"

const ProgramList = () => {
    const navigate = useNavigate()

    const buttonStyle = {
        borderRadius : '5px'
    }

    return(
        <div className="container">
            <h1 className="mt-5"><b>Hello, Admin!</b></h1>
            <SearchBar/>
            <div className="mt-4 mb-4">
                <Button title={" + Add Program "} styling={buttonStyle} navigate={() => navigate('/home/program-form')}/>
            </div>
            <Card title={"ITDP SMM Batch 3"} isActivity={false}/> 
            <Card title={"ITDP SMM Batch 2"} isActivity={false}/>
            <Card title={"ITDP SMM Batch 1"} isActivity={false}/>
        </div>
    )
}

export default Layout(ProgramList)