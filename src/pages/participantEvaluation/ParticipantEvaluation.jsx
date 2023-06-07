import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button/Button"
import { DefaultProfileIcon } from "../../assets"
import useParticipantEvaluation from "./useParticipantEvaluation"
import { useEffect } from "react"

const ParticipantEvaluation = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {getParticipantEvaluation, data} = useParticipantEvaluation()
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

    useEffect(() => {
        getParticipantEvaluation(params.id)
    }, [])
    return(
        <div className="container px-5 mb-5">
            <h1 className="mt-5"><b>SMM ITDP Batch 3</b></h1>
            <span className="line-rest"/>

            <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start'}}>My Evaluation Result</h4>
                <p style={{ alignSelf: 'flex-end'}}>Mid Evaluation</p>
                <p style={{ alignSelf: 'flex-end'}}>Final Evaluation</p>
            </div>
            <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start'}}>Result</h4>
                <button disabled className="btn" style={data.MidStatus === "Passed" ? passedButton : failedButton}>{data.MidStatus}</button>
                <button disabled className="btn" style={data.FinalStatus === "Passed" ? passedButton : failedButton}>{data.FinalStatus}</button>
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