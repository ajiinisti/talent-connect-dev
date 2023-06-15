import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/modal/DeleteModal";
import useAspect from "./useAspect";

const DropdownEval = ({id, title, isAspect, toogleModal}) => {
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOut, setIsDeleteModalOut] = useState(false)
  const toggleShowDeleteModal = () => setIsDeleteModalOut(!isDeleteModalOut);
  const {deleteAspect, deleteCategory} = useAspect()
  const type = isAspect ? "aspect": "category"
  const deleteButton = isAspect ? deleteAspect : deleteCategory

  const handleItemClick = (isAspect, type) => {
      console.log(isAspect,type)
      if (isAspect) {
        if (type === "update") {
          navigate(`/evaluation-scoring/evaluation-aspect-form/${id}`)
        } else {
          toggleDropdown()
          toggleShowDeleteModal()
        }
      }else{
        if (type === "update") {
          navigate(`/evaluation-scoring/evaluation-category-form/${id}`)
        } else if (type === "delete") {
          toggleDropdown()
          toggleShowDeleteModal()
        } else{
          toggleDropdown()
          toogleModal()
        }
      }
      setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
  const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
  }
  };

  const handleDeleteFunction = () => {
    deleteButton(id)
    window.location.reload()
  }

  useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
  }, []);

  return(
    <>
      <div className="dropdown" ref={dropdownRef}>
        <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
          <FaEllipsisV style={{ marginBottom: '0.2rem'}}/>
        </label>
        { 
          isDropdownOpen && isAspect ?
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => handleItemClick( true, "update")}>
              Edit Evaluation Aspect
            </button>
            <button className="dropdown-item" onClick={() => handleItemClick(true, "delete")}>
              Delete Evaluation Aspect
              </button>
            </div>:
          <></>
        }
        {
          isDropdownOpen && !isAspect ?
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => handleItemClick( false, "update")}>
              Edit Evaluation Category
            </button>
            <button className="dropdown-item" onClick={() => handleItemClick(false, "delete")}>
              Delete Evaluation Category
            </button>
            <button className="dropdown-item" onClick={() => handleItemClick( false, "add")}>
              Assign to Program
            </button>
          </div> :
          <></>
        }
      </div>

      <DeleteModal 
        title={title} 
        type={type} 
        isModalOut={isDeleteModalOut} 
        setIsModalOut={setIsDeleteModalOut} 
        toggleShow={toggleShowDeleteModal}
        deleteFunction={handleDeleteFunction}
      />
    </>
  )
}

export default DropdownEval