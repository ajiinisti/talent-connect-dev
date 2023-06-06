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
import { BsArrowLeft } from "react-icons/bs"
import Button from "../../components/button/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import SearchBar from '../../components/searchbar/Searchbar'

const EvaluationCategoryForm = () => {
    const params = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const [aspectList, setAspectList] = useState([])
    const [allAspectList, setAllAspectList] = useState([
        { aspect: "Feature A", option: "Rating"},
        { aspect: "Feature B", option: "Rating"},
        { aspect: "Feature C", option: "Rating"},
    ])
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
    }, []);

    return(
        <>
            <div className="container mt-4 px-4">
                <h1><BsArrowLeft/><b>
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
                            <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
                        </>: 
                        <>
                            <Button title={"Add Evaluation Category"} navigate={() => (0)}/>
                            <Button title={"Cancel"} navigate={() => (0)} styling={buttonCancelStyle}/>
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
                    <MDBModalBody className='align-item-left'>
                        {
                            allAspectList.map((aspect, index)=> (
                                <div>
                                    <label>
                                        <input
                                        type="checkbox"
                                        checked={allSelectedAspects[index]?.selected || false}
                                        onChange={() => handleCheckboxChange(index)}
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
                        <MDBBtn color='secondary' onClick={(e)=>toggleShow(e)}>
                            Close
                        </MDBBtn>
                        <MDBBtn className='btn btn-primary custom-button' onClick={(e)=> modalToForm(e)}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}

export default EvaluationCategoryForm