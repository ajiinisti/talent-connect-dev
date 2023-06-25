import Button from "../../components/button/Button"
import CancelButton from "../../components/button/CancelButton"

const FeedbackForm = ({id, name}) => {
    return(
        <>
            <h5 className="mt-4 mb-4">{name}</h5>
            <form className="mb-3">
                <textarea 
                    required
                    rows="4" 
                    id="description" 
                    name="description" 
                    className="form-control" 
                    placeholder="Write Feedback"
                />
            </form>
            <Button title={"Add Feedback"}/>
            <CancelButton/>
        </>
    )
}

export default FeedbackForm