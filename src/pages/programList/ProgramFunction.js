import { useState } from "react";

const useProgramList = () => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    
    const toggleModal = () => {
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };
    
    const handleDelete = () => {
        // Logika penghapusan di sini
        toggleModal();
    };    

    return {
        isModalDeleteOpen,
        toggleModal,
        handleDelete
    }
}

export default useProgramList