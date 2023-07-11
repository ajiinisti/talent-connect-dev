import { useEffect } from "react"
import ArrowButton from "../../components/button/ArrowButton"
import useEvaluateScore from "./useEvaluateScore"
import { useParams } from "react-router-dom"
import EvaluationResult from "../../components/evaluationResult/EvaluationResult"

const ProgramEvaluateScore = () => {
    const {payload, getScore} = useEvaluateScore()
    const params = useParams()

    const programId = params.programId
    const evalId = params.evalIid

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
      getScore(evalId,programId)
    }, [])
    
    return (
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><b></b></h2>
            <hr/>
            <div className="row mt-4 px-3">
                <div className="d-flex flex-row">
                <ArrowButton/>
                <div className="d-flex flex-column">
                    <h4>{payload.name}</h4>
                    <h6>{payload.program_name}</h6>
                </div>
                </div>
                <h5 className="mt-4">{capitalizeFirstLetter(payload.evaluation_stages[0]?.stage|| '')} Evaluation Result</h5>
                <EvaluationResult evaluation_stages={payload.evaluation_stages[0]}/>
            </div>
        </div>
    )
}

export default ProgramEvaluateScore