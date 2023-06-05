import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import DropdownEval from "./DropdownEval"

const EvaluationScoring = () => {
    const navigate = useNavigate()
    return(
        <div className="container py-3 px-5">
            <h1 className="mt-2"><b>Evaluation Scoring</b></h1>
            <hr/>
            <div className="mt-4">
                <h2 className="mt-3 mb-3">Evaluation Aspects</h2>
                <Button title={"+ Add Evaluation Aspect"} navigate={()=>navigate('/home/evaluation-scoring/evaluation-aspect-form')}/>
                <div className="mt-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="container mt-4 pb-4">  
                        <div className="row">
                            <div className="col-5 aspect-title">Evaluation Aspects</div>
                            <div className="col-1 aspect-title">Type</div>
                            <div className="col-1 aspect-title">Options</div>
                            <div className="col-4 aspect-title">Description</div>
                            <div className="col-1 aspect-title"></div>
                        </div>

                        {/* Loop disini */}
                        <hr/>
                        <div className="row mt-4">
                            <div className="col-5">Evaluation Aspects</div>
                            <div className="col-1">Type</div>
                            <div className="col-1">Options</div>
                            <div className="col-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Ab voluptatum numquam, architecto ad harum eum corrupti iure repudiandae soluta atque 
                            aliquam? Similique magni quidem explicabo fugit dicta necessitatibus voluptate sint.</div>
                            <div className="col-1"><DropdownEval isAspect={true}/></div>
                        </div>

                        <hr/>
                        <div className="row mt-4">
                            <div className="col-5">Evaluation Aspects</div>
                            <div className="col-1">Type</div>
                            <div className="col-1">Options</div>
                            <div className="col-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Ab voluptatum numquam, architecto ad harum eum corrupti iure repudiandae soluta atque 
                            aliquam? Similique magni quidem explicabo fugit dicta necessitatibus voluptate sint.</div>
                            <div className="col-1"><DropdownEval isAspect={true}/></div>
                        </div>

                    </div>
                </div>

                <h2 className="mt-5 mb-3">Evaluation Category</h2>
                <Button title={"+ Add Evaluation Category"} navigate={()=>(0)}/>
                <div className="mt-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="container mt-4 pb-4">  
                        <div className="row">
                            <div className="col-11 aspect-title">Category</div>
                            <div className="col-1 aspect-title"></div>
                        </div>

                        {/* Loop disini */}
                        <hr/>
                        <div className="row mt-4">
                            <div className="col-11">Evaluation Aspects</div>
                            <div className="col-1"><DropdownEval isAspect={false}/></div>
                        </div>

                        <hr/>
                        <div className="row mt-4">
                            <div className="col-11">Evaluation Aspects</div>
                            <div className="col-1"><DropdownEval isAspect={false}/></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EvaluationScoring