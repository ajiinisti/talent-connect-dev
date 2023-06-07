import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit'
import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ArrowButton from '../../components/button/ArrowButton'
import CancelButton from '../../components/button/CancelButton'

const EvaluationCategoryForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const [aspectList, setAspectList] = useState([])
    const [allAspectList, setAllAspectList] = useState([])
    const [allSelectedAspects, setAllSelectedAspects] = useState([]);
    const [isModalOut, setIsModalOut] = useState(false)
    const toggleShow = (e) => {
        e.preventDefault()
        setIsModalOut(!isModalOut)
    }

    const handleCheckboxChange = (index) => {
        const updatedAspects = [...allSelectedAspects];
        updatedAspects[index].selected = !updatedAspects[index].selected;
        setAllSelectedAspects(updatedAspects);
    };

    const buttonCancelStyle = {
        borderRadius : '5px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        border: '0.5px solid #d3d3d3',
        outline: 'gray',
        marginLeft: '1rem'
    }

    const modalToForm = (e) => {
        e.preventDefault()
        const selectedAspects = allSelectedAspects.filter(aspect => aspect.selected);
        setAspectList(prevList => prevList.concat(selectedAspects));
        setIsModalOut(!isModalOut)
    }

    useEffect(()=> {
        if(params.id) {
            setUpdate(true)
        }
    },[params.id])

    useEffect(() => {
        const initialAspects = allAspectList.map((aspect) => ({
          ...aspect,
          selected: false,
        }));
        setAllSelectedAspects(initialAspects);
    }, [allAspectList]);

    useEffect(() => {
        setAllAspectList(
            [
                { aspect: "Feature A", option: "Rating"},
                { aspect: "Feature B", option: "Rating"},
                { aspect: "Feature C", option: "Rating"},
            ]
        )
    }, [])

    return(
        <>
            <div className="container py-5 px-5 mb-5">
                <h1><ArrowButton/><b>
                    {
                        isUpdate ? " Edit Evaluation Category": " Add Evaluation Category"
                    }
                </b></h1>
                <form className="mt-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                    <div className="mb-4">
                        <label htmlFor="evaluationAspectTitle" className="form-label">Title</label>
                        <input type="text" className="form-control evaluation-aspect-form " id="evaluationAspectTitle" placeholder="Enter title"/>
                    </div>
                    <div className="mb-4" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <label htmlFor="description" className="form-label">Aspect</label>
                        {/* <Button title={"+"} navigate={()=>toggleShow()}/> */}
                        <button onClick={(e)=> toggleShow(e)} className='btn btn-primary custom-button'>+</button>
                    </div>
                    <div className="mb-4 px-4 py-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                        {
                            aspectList.map((aspect)=> (
                                <div key={aspect}>
                                    <h6>{aspect.aspect}</h6>
                                    <span style={{color: 'gray'}}>{aspect.option}</span>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                    {
                        isUpdate ? 
                        <>
                            <Button title={"Save Changes"} navigate={() => (0)}/>
                            <CancelButton/>
                        </>: 
                        <>
                            <Button title={"Add Evaluation Category"} navigate={() => (0)}/>
                            <CancelButton/>
                        </>
                    }
                </form>
            </div>

            <MDBModal show={isModalOut} setShow={setIsModalOut} >
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add Aspect</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={(e)=>toggleShow(e)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody style={{ alignContent: 'flex-start'}}>
                        {
                            allAspectList.map((aspect, index)=> (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '10px' }}>
                                        <input
                                        type="checkbox"
                                        checked={allSelectedAspects[index]?.selected || false}
                                        onChange={() => handleCheckboxChange(index)}
                                        style={{marginRight:'10px'}}
                                        />
                                          {aspect.aspect}
                                    </label>
                                    <span style={{color: 'gray'}}>{aspect.option}</span>
                                    <hr/>
                                </div>
                            ))
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <Button title={"Cancel"} navigate={(e)=>toggleShow(e)} styling={buttonCancelStyle}/>
                        <Button title={"Save Changes"} navigate={(e)=> modalToForm(e)}/>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default EvaluationCategoryForm