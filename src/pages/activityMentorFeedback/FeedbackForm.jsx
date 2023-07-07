import Button from "../../components/button/Button"
import CancelButton from "../../components/button/CancelButton"

const FeedbackForm = ({id, name, navigate, setComment}) => {
    return(
        <>
            <h5 className="mt-4 mb-4">{name}</h5>
            <form className="mb-3">
                <textarea 
                    required
                    rows="4" 
                    id="feedback" 
                    name="feedback" 
                    className="form-control" 
                    placeholder="Write Feedback"
                    onChange={setComment}
                />
            </form>
            <Button title={"Add Feedback"} navigate={navigate}/>
            <CancelButton/>
        </>
    )
}

export default FeedbackForm