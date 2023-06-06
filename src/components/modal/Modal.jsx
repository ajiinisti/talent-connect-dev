import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Modal = () => {
    const [isModalOut, setIsModalOut] = useState(false)
    const toggleShow = () => setIsModalOut(!isModalOut);
    return(    
        <MDBModal show={isModalOut} setShow={setIsModalOut} >
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>...</MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                </MDBBtn>
                <MDBBtn>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default Modal