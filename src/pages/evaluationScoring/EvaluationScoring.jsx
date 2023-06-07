import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DropdownEval from "./DropdownEval";
import { useEffect } from "react";
import useAspect from "./useAspect";

const EvaluationScoring = () => {
  const navigate = useNavigate();
  const { aspect, category, getAspect, getCategory } = useAspect();

  useEffect(() => {
    getAspect();
    getCategory();
  }, []);
  return (
    <div className="container py-3 px-5">
      <h1 className="mt-2">
        <b>Evaluation Scoring</b>
      </h1>
      <hr />
      <div className="mt-4">
        <h2 className="mt-3 mb-3">Evaluation Aspects</h2>
        <Button
          title={"+ Add Evaluation Aspect"}
          navigate={() =>
            navigate("/evaluation-scoring/evaluation-aspect-form")
          }
        />
        <div
          className="mt-4"
          style={{ border: "0.5px solid #d3d3d3", borderRadius: "10px" }}
        >
          <div className="container mt-4 pb-4">
            <div className="row">
              <div className="col-8 aspect-title">Evaluation Aspects</div>
              <div className="col-1 aspect-title">Type</div>
              <div className="col-1 aspect-title">Options</div>
              {/* <div className="col-4 aspect-title">Description</div> */}
              <div className="col-1 aspect-title"></div>
            </div>

            {/* Loop disini */}
            <hr />
            {aspect ? (
              aspect.map((v) => (
                <div key={v.ID}>
                  <div className="row mt-4">
                    <div className="col-8">{v.Question}</div>
                    <div className="col-1">{v.Type}</div>
                    <div className="col-1">{v.options?.length}</div>
                    {/* <div className="col-4">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ab voluptatum numquam, architecto ad harum eum corrupti
                      iure repudiandae soluta atque aliquam? Similique magni
                      quidem explicabo fugit dicta necessitatibus voluptate
                      sint.
                    </div> */}
                    <div className="col-1">
                      <DropdownEval id={v.ID} isAspect={true} />
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <h2 className="mt-5 mb-3">Evaluation Category</h2>
        <Button
          title={"+ Add Evaluation Category"}
          navigate={() =>
            navigate("/evaluation-scoring/evaluation-category-form")
          }
        />
        <div
          className="mt-4"
          style={{ border: "0.5px solid #d3d3d3", borderRadius: "10px" }}
        >
          <div className="container mt-4 pb-4">
            <div className="row">
              <div className="col-11 aspect-title">Category</div>
              <div className="col-1 aspect-title"></div>
            </div>

            {/* Loop disini */}
            <hr />
            {category ? category.map((v)=>(
                <div key={v.ID}>
                <div className="row mt-4">
                  <div className="col-11">{v.Name}</div>
                  <div className="col-1">
                    <DropdownEval id={v.ID} isAspect={false} />
                  </div>
                </div>
    
                <hr />
                </div>
                
            )) : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationScoring;
