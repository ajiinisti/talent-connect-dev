import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"

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
            <h3 className="mt-5">Mid Evaluation</h3>
            <div className="container mb-4 px-5 py-4" style={{display: 'flex', justifyContent: 'space-between', border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start', marginBottom:'1rem'}}>Result</h4>
                <p style={{ alignSelf: 'flex-end'}}>Not Yet Evaluated</p>
                <p style={{ alignSelf: 'flex-end', color: '#A684F2'}}>Evaluated</p>
            </div>
            <h3 className="mt-5">Final Evaluation</h3>
            <div className="container mb-4 px-5 py-4" style={{display: 'flex', justifyContent: 'space-between', border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start', marginBottom:'1rem'}}>Result</h4>
                <p style={{ alignSelf: 'flex-end'}}>Not Yet Evaluated</p>
                <p style={{ alignSelf: 'flex-end', color: '#A684F2'}}>Evaluated</p>
            </div>
            <h3 className="mt-5">Final Result</h3>
            <div className="container mb-4 px-5 py-4" style={{display: 'flex', justifyContent: 'space-between', border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <h4 className="mt-4" style={{ alignSelf: 'flex-start', marginBottom:'1rem'}}>Result</h4>
                <p style={{ alignSelf: 'flex-end'}}>Not Yet Evaluated</p>
                <p style={{ alignSelf: 'flex-end', color: '#A684F2'}}>Evaluated</p>
            </div>
        </div>
    )
}

export default ParticipantEvaluation