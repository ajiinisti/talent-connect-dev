import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"

const ActivityForm = () => {
    const buttonStyle = {
        borderRadius : '5px'
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

    return(
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>SMM ITDP Batch 3</b></h1>
            <hr/>
            <div className="row mt-4 px-3">
                <h4><BsArrowLeft/> Add Activity</h4>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="activityTitle" className="form-label">Title</label>
                        <input type="email" className="form-control" id="activityTitle" placeholder="Enter title"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input type="link" className="form-control" id="link" placeholder="Enter Link"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="participant" className="form-label">Participant</label>
                        <input disabled="disabled" type="participant" className="form-control" id="participant" placeholder="All"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="Text1" rows="5" id="description" className="form-control">Description</textarea>
                    </div>
                    <Button title={"Add Activity"} navigate={() => (0)} styling={buttonStyle}/>
                    <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                </form>
            </div>
        </div>
    )
}

export default ActivityForm