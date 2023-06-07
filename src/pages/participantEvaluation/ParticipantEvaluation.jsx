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
        border:'2px solid green',
        height: '3rem'
    }

    const failedButton = {
        color: 'red',
        backgroundColor: '#FED7D7',
        border:'2px solid red',
        height: '3rem'
    }

    useEffect(() => {
        getParticipantEvaluation(params.id)
    }, [])
    return(
        <div className="container py-5 px-5 mb-5">
        <h2><b>Evaluation</b></h2>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h4 className="mt-4" style={{ alignSelf: 'flex-start', marginBottom:'1rem'}}>Mid evaluation</h4>
        </div>

            <div className="container mb-4 px-5 py-4" style={{display: 'flex', justifyContent: 'space-between', border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <h4 className="mt-2" style={{ alignSelf: 'flex-start'}}>Result</h4>
                <button disabled className="btn" style={data.MidStatus === "Passed" ? passedButton : failedButton}>{data.MidStatus}</button>
            </div>
            <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start', marginBottom:'1rem'}}>Final Evaluation</h4>
            </div>

            <div className="container mb-4 px-5 py-4" style={{display: 'flex', justifyContent: 'space-between', border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
            <h4 className="mt-2" style={{ alignSelf: 'flex-start'}}>Result</h4>
                <button disabled className="btn" style={data.FinalStatus === "Passed" ? passedButton : failedButton}>{data.FinalStatus}</button>
            </div>
        </div>
    )
}

export default ParticipantEvaluation