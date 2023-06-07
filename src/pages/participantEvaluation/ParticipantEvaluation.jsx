import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import { DefaultProfileIcon } from "../../assets"

const ParticipantEvaluation = () => {
    const navigate = useNavigate()
    const isMidEvaluation = true

    const buttonEvalStyle = {
        borderRadius : '5px',
        backgroundColor: 'white',
        color: 'black',
        outline: 'gray',
        width:'100%'
    }

    const passedButton = {
        color: 'green', 
        backgroundColor: '#D7FED8', 
        border:'2px solid green'
    }

    const failedButton = {
        color: 'red',
        backgroundColor: '#FED7D7',
        border:'2px solid red'
    }
    return(
        <div className="container px-5 mb-5">
            <h1 className="mt-5"><b>Evaluation</b></h1>
            <h6>Mid Evaluation</h6>
            <h6>Final Evaluation</h6>
            <div class="row mt-5">
                <div class="col-2">
                    <Button title={<h6>Mid Evaluation</h6>} styling={buttonEvalStyle} navigate={() => navigate('/evaluations/mid-eval')}/>
                </div>
                <div class="col-2">
                    <Button title={<h6>Final Evaluation</h6>} styling={buttonEvalStyle} navigate={() => navigate('/evaluations/final-eval')}/>
                </div>
            </div>
            
            { 
                isMidEvaluation ?
                <>
                    <span className="line-evaluation-purple"/>
                    <span className="line-evaluation"/>
                </>: 
                <>
                <span className="line-evaluation"/>
                <span className="line-evaluation-purple"/>
                </>
            }
            <span className="line-rest"/>

            <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start'}}>My Evaluation Result</h4>
                <p style={{ alignSelf: 'flex-end'}}>Not Yet Evaluated</p>
                <p style={{ alignSelf: 'flex-end', color: '#A684F2'}}>Evaluated</p>
            </div>
            <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start'}}>Result</h4>
                <button disabled className="btn" style={passedButton}>Passed</button>
                <button disabled className="btn" style={failedButton}>Failed</button>
            </div>
            {
                isMidEvaluation?
                <></>:     
                <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h4 className="mt-4" style={{ alignSelf: 'flex-start'}}><b></b>Final Result</h4>
                    <button disabled className="btn" style={passedButton}>Passed</button>
                    <button disabled className="btn" style={failedButton}>Failed</button>
                </div>
            }
        </div>
    )
}

export default ParticipantEvaluation