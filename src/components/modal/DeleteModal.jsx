import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import Button from '../button/Button';

const DeleteModal = ({title, type, isModalOut, setIsModalOut, toggleShow, deleteFunction}) => {
    const deleteButton = {
        color: 'white',
        backgroundColor: '#FF4935',
        borderRadius : '5px',
        height: '40px',
        border: '0.5px solid #FF4935',
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

    return(    
        <MDBModal show={isModalOut} setShow={setIsModalOut} >
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <div className="container" style={{ alignContent: 'flex-start'}}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ marginBottom: '1.5rem' }}>Are you sure you want to delete {title}?</h4>
                                <span>Once you delete this {type} you cannot retrieve it</span>
                            </div>
                        </div>
                    </MDBModalHeader>
                    <MDBModalFooter>
                        <Button title={"Cancel"} navigate={(e)=> toggleShow(e)} styling={buttonCancelStyle}/>
                        <Button title={"Confirm"} navigate={deleteFunction} styling={deleteButton}/>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
    )
}

export default DeleteModal