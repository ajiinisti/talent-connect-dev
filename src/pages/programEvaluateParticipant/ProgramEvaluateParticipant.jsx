import { useNavigate } from "react-router-dom"
import { DefaultProfileIcon } from "../../assets"
import Button from "../../components/button/Button"

const ProgramEvaluateParticipant = () => {
    const navigate = useNavigate()
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

    return(
        <div className="container py-5 px-5 mb-5">
            <h1 className="mt-5"><b>SMM ITDP Batch 3</b></h1>
            <div class="row mt-5">
                <div class="col-2">
                    <Button title={<h6>Mid Evaluation</h6>} styling={buttonEvalStyle}/>
                </div>
                <div class="col-2">
                    <Button title={<h6>Final Evaluation</h6>} styling={buttonEvalStyle}/>
                </div>
            </div>
            <span className="line-evaluation"/>
            <span className="line-evaluation-purple"/>
            <span className="line-rest"/>

            <h4 className="mt-4">Need to be Evaluated</h4>
            <div>
                <div className="mt-4">
                    <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    <Button title={"Evaluate"} styling={buttonStyling} navigate={() => navigate("id")}/>
                </div>
                <hr/>
                <div className="mt-4">
                    <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    <Button title={"Evaluate"} styling={buttonStyling} navigate={() => navigate("id")}/>
                </div>
                <hr/>
                <div className="mt-4">
                    <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    <Button title={"Evaluate"} styling={buttonStyling} navigate={() => navigate("id")}/>
                </div>
            </div>
            <h4 className="mt-5">Already Evaluated</h4>
            <div>
                <div className="mt-4">
                    <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    <Button title={"Detail"} styling={buttonEvaluatedStyle} navigate={() => navigate("id")}/>
                </div>
                <hr/>
                <div className="mt-4">
                    <img src={DefaultProfileIcon} style={{ width: '5%' }} alt="Profile Icon" /> <span>Alwin Ihza</span>
                    <Button title={"Detail"} styling={buttonEvaluatedStyle} navigate={() => navigate("id")}/>
                </div>
            </div>
        </div>
    )
}

export default ProgramEvaluateParticipant