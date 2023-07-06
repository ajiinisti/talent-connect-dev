import { useNavigate, useParams } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import useEvaluateParticipant from "./useEvaluateParticipant"

const ProgramEvaluateParticipant = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {getEvaluation, data, getProgram, program} = useEvaluateParticipant()
    const [active,setActive] = useState("Mid")
    const buttonStyling = {
        float: 'right'
    }

    const buttonEvaluatedStyle = {
        borderRadius : '5px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        float: 'right'
    }

    const buttonEvalStyle = {
        borderRadius : '5px',
        backgroundColor: 'white',
        color: 'black',
        outline: 'gray',
        width:'100%'
    }

    useEffect(() => {
        getEvaluation(params.id)
        getProgram(params.id)
    }, [params.id])

    return(
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-5"><b>{program}</b></h2>
            <div className="row mt-5">
                <div className="col-2">
                    <Button navigate={()=>{
                        setActive("Mid")
                    }} title={<h6>Mid Evaluation</h6>} styling={buttonEvalStyle}/>
                </div>
                <div className="col-2">
                    <Button navigate={()=>{
                        setActive("Final");
                        }} type="button" title={<h6>Final Evaluation</h6>} styling={buttonEvalStyle}/>
                </div>
            </div>
            <span className={active == "Mid" ? "line-evaluation-purple" : "line-evaluation"}/>
            <span className={active == "Final" ? "line-evaluation-purple" : "line-evaluation"}/>
            <span className="line-rest"/>

            <h4 className="mt-4">Need to be Evaluated</h4>
            <div>
                {data?.[active] ? data?.[active].map((v)=>(
                    !v.IsEvaluated && <>
                    <div key={v.ID} className="mt-4">
                        <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>{v.Participant.User.FirstName} {v.Participant.User.LastName}</span>
                        <Button title={"Evaluate"} styling={buttonStyling} navigate={() => navigate(v.ID)}/>
                    </div>
                    <hr/>
                    </>
                )) : <></>}
            </div>
            <h4 className="mt-5">Already Evaluated</h4>
            <div>
                {data?.[active] ? data?.[active].map((v)=>(
                    v.IsEvaluated && <>
                    <div key={v.ID} className="mt-4">
                        <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>{v.Participant.User.FirstName} {v.Participant.User.LastName}</span>
                        <Button title={"Evaluate"} styling={buttonStyling} navigate={() => navigate(v.ID)}/>
                    </div>
                    <hr/>
                    </>
                )) : <></>}
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipant