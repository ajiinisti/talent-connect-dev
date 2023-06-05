import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropdownEval = ({id, isAspect}) => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleItemClick = (id, isAspect, type) => {
        console.log(id,isAspect,type)
        if (isAspect) {
          if (type === "update") {
            navigate(`/evaluation-scoring/evaluation-aspect-form/${id}`)
          } else {
          }
        }else{
          if (type === "update") {
            navigate(`/evaluation-scoring/evaluation-category-form/${id}`)
          } else if (type === "delete") {
            toggleDropdown()
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

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return(
        <div className="dropdown" ref={dropdownRef}>
            <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                <FaEllipsisV style={{ marginBottom: '0.2rem'}}/>
            </label>
            { 
                isDropdownOpen && isAspect ?
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => handleItemClick('Item 2', true, "update")}>
                    Edit Evaluation Aspect
                    </button>
                    <button className="dropdown-item" onClick={() => handleItemClick('Item 3', true, "delete")}>
                    Delete Evaluation Aspect
                    </button>
                </div>:
                <></>
            }
            {
                isDropdownOpen && !isAspect ?
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => handleItemClick('Item 2', false, "update")}>
                    Edit Evaluation Category
                    </button>
                    <button className="dropdown-item" onClick={() => handleItemClick('Item 3', false, "delete")}>
                    Delete Evaluation Category
                    </button>
                    <button className="dropdown-item" onClick={() => handleItemClick('Item 1', false, "add")}>
                    Assign to Program
                    </button>
                </div> :
                <></>
            }
        </div>
    )
}

export default DropdownEval