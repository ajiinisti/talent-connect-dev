const EvaluationResult = ({evaluation_stages}) => {
    return(
        <div className="px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>      
                <div className="d-flex flex-row" style={{borderBottom: '0.5px solid #d3d3d3', fontSize:'20px'}}>
                    <div className="col-6 aspect-title" >Evaluation Categories</div>
                    <div className="col-2 aspect-title">Score</div>
                    <div className="col-2 aspect-title">Weight</div>
                    <div className="col-2 aspect-title">Final Score</div>
                </div>
                {evaluation_stages?.evaluation_categories?.map((v,i) => 
                    <div className="d-flex flex-row mt-4 mb-4" key={i} style={{borderBottom: '0.5px solid #d3d3d3', fontSize:'18px'}}>
                        <div className="col-6">{v.categories}</div>
                        <div className="col-2">{v.score ? v.score : '-'}</div>
                        <div className="col-2">{v.weight}</div>
                        <div className="col-2">{v.final_score ? v.score : '-'}</div>
                    </div>
                )}
                <div className="d-flex flex-row mt-4">
                    <div className="aspect-title col-10" style={{fontSize:'1.5em'}}>Total Score</div>
                    <div style={{fontSize:'1.5em'}}>{evaluation_stages?.final_score ? evaluation_stages.final_score : '-'}</div>
                </div>
        </div>
    )
}

export default EvaluationResult