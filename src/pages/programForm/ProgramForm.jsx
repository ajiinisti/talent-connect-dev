import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"

const ProgramForm = () => {
    return(
        <div className="container mt-4">
            <h1><b>Add Program</b></h1>
            <form className="mt-5">
                <div className="mb-4">
                    <label for="programTitle" className="form-label">Title</label>
                    <input type="email" className="form-control" id="programTitle" placeholder="Enter title"/>
                </div>
                <div className="mb-4">
                    <label for="startDate" className="form-label">Start Date</label>
                    <input type="date" className="form-control" id="startDate" placeholder="DD/MM/YYYY"/>
                </div>
                <div className="mb-4">
                    <label for="endDate" className="form-label">End Date</label>
                    <input type="date" className="form-control" id="endDate" placeholder="DD/MM/YYYY"/>
                </div>
                <Button title={"Add Program"} navigate={() => (0)}/>
            </form>
        </div>
    )
}

export default Layout(ProgramForm)