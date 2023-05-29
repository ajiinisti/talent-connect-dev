import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import Layout from "../../components/layout/Layout"
import SearchBar from "../../components/searchbar/Searchbar"

const ProgramList = () => {
    const navigate = useNavigate()

    return(
        <div className="container">
            <h1 className="mt-5">Hello, Alwin!</h1>
            <SearchBar/>
            <div className="mt-4">
                <Button title={"Add Program"} navigate={() => navigate('/home/activity-list')}/>
            </div>
            <Card title={"ITDP SMM Batch 3"} isActivity={false}/> 
            <Card title={"ITDP SMM Batch 2"} isActivity={false}/>
            <Card title={"ITDP SMM Batch 1"} isActivity={false}/>
        </div>
    )
}

export default Layout(ProgramList)