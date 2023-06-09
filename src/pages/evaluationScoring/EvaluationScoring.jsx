import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DropdownEval from "./DropdownEval";
import { useEffect, useState } from "react";
import useAspect from "./useAspect";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdb-react-ui-kit'

import Select from 'react-select';

const EvaluationScoring = () => {
  const navigate = useNavigate();
  const [isModalOut, setIsModalOut] = useState(false)
  const { aspect, category, getAspect, getCategory, allProgram, getProgram, postProgEval } = useAspect();
  const [assignCategoryToProgram, setAssignCategoryToProgram] = useState({
    questionCategoryId: "",
    programId: "",
    CategoryWeight: 0.0
  });

  const changeCategoryName = (id) => {
      setAssignCategoryToProgram({
          ...assignCategoryToProgram,
          questionCategoryId: id
      })
      toggleShow()
  }

  const toggleShow = () => {
      setIsModalOut(!isModalOut)
  }
  

  const submitCategoryToProgram = (e) => {
    e.preventDefault()
    postProgEval(assignCategoryToProgram, setIsModalOut)
}

const setProgramState = (selectedOption) => {
    setAssignCategoryToProgram({
        ...assignCategoryToProgram,
        programId: selectedOption ? selectedOption.value : null
    })
}

const buttonCancelStyle = {
    borderRadius : '5px',
    height: '40px',
    backgroundColor: 'white',
    color: 'black',
    border: '0.5px solid #d3d3d3',
    outline: 'gray',
    marginLeft: '1rem'
}

  useEffect(() => {
    getAspect();
    getCategory();
    getProgram();
  }, []);
  return (
    <>
    <div className="container py-5 px-5 mb-5">
      <h2 className="mt-2">
        <b>Evaluation Scoring</b>
      </h2>
      <hr />
      <div className="mt-4">
        <h3 className="mt-3 mb-3">Evaluation Aspects</h3>
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
                    <div className="col-1">{v.Option > 0 ?  v.Option : ""}</div>
                    {/* <div className="col-4">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ab voluptatum numquam, architecto ad harum eum corrupti
                      iure repudiandae soluta atque aliquam? Similique magni
                      quidem explicabo fugit dicta necessitatibus voluptate
                      sint.
                    </div> */}
                    <div className="col-1">
                      <DropdownEval id={v.ID} isAspect={true} title={v.Question} />
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

        <h3 className="mt-5 mb-3">Evaluation Category</h3>
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
                    <DropdownEval id={v.ID} isAspect={false} toogleModal={()=>changeCategoryName(v.ID)} title={v.Name}/>
                  </div>
                </div>
    
                <hr />
                </div>
                
            )) : <></>}
          </div>
        </div>
      </div>
    </div>
    

    <MDBModal show={isModalOut} setShow={setIsModalOut} >
      <MDBModalDialog>
        <MDBModalContent>
            <MDBModalHeader>
                <div className="container" style={{ alignContent: 'flex-start'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ marginBottom: '1.5rem' }}>Assign {assignCategoryToProgram.categoryName} to Program</h4>
                        <Select onChange={setProgramState} options={allProgram} id="type" placeholder="Select Program" />
                        <input type="number" step="10.0" name="CategoryWeight" placeholder="Category Weight ex: 10.5" value={assignCategoryToProgram.CategoryWeight} onChange={(e)=>setAssignCategoryToProgram({...assignCategoryToProgram, CategoryWeight: e.target.value})}/>
                    </div>
                </div>
            </MDBModalHeader>
            <MDBModalFooter>
                <Button title={"Cancel"} navigate={(e)=> toggleShow(e)} styling={buttonCancelStyle}/>
                <Button title={"Confirm"} navigate={(e)=> submitCategoryToProgram(e)}/>
            </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  );
};

export default EvaluationScoring;
