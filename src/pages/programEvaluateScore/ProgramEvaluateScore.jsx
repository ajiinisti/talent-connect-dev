import ArrowButton from "../../components/button/ArrowButton"

const ProgramEvaluateScore = () => {
    return (
        <div className="container py-5 px-5 mb-5">
            <h2 className="mt-2"><b></b></h2>
            <hr/>
            <div className="row mt-4 px-3">
                <div className="d-flex flex-row">
                <ArrowButton/>
                <div className="d-flex flex-column">
                    <h4>Ariel</h4>
                    <h7>SMM</h7>
                </div>
                </div>
                <h5 className="mt-4">Mid Evaluation Result</h5>
                <div className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    
                <div className="row">
                    <div className="col-6 aspect-title">Evaluation Categories</div>
                    <div className="col-2 aspect-title">Score</div>
                    <div className="col-2 aspect-title">Weight</div>
                    <div className="col-2 aspect-title">Final Score</div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">Golang Fundamental</div>
                    <div className="col-2">100</div>
                    <div className="col-2">50%</div>
                    <div className="col-2">50</div>
                </div>
                <div className="row mt-4">
                    <div className="aspect-title">Total Score</div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramEvaluateScore