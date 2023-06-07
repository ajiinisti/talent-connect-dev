import { DefaultProfileIcon } from "../../assets"
import { FaEllipsisV } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteModal from "../../components/modal/DeleteModal"

const UserCard = ({name, email, role}) => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    
    const [isDeleteModalOut, setIsDeleteModalOut] = useState(false)
    const toggleShowDeleteModal = () => setIsDeleteModalOut(!isDeleteModalOut);

    const handleItemClick = (id, type) => {
        console.log(id,type)
        if (type === "edit") {
            navigate(`/user-management/user-form/${id}`)
        } else if (type === "delete"){
            toggleDropdown()
            toggleShowDeleteModal()
        } else{
            navigate(`/user-management/assign-user/${id}`)
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

    const handleDeleteFunction = (event) => {
        event.preventDefault()
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return(
        <>
            <div className="row mt-3 px-4">
                <div className="col-3">
                    <img src={DefaultProfileIcon} alt="Profile Icon"/> {name}
                </div>
                <div className="col-4 py-1">
                    <p>{email}</p>
                </div>
                <div className="col-2 py-1">
                    {role}
                </div>
                <div className="col-2 py-1">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="customSwitch2"/>
                        <label class="form-check-label" for="customSwitch2"></label>
                    </div>
                </div>
                <div className="col-1 py-1">
                    <div className="dropdown" ref={dropdownRef} style={{ position: 'relative'}}>
                        <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                        <FaEllipsisV style={{ marginBottom: '0.2rem' }} />
                        </label>
                        {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => handleItemClick('Item 1', "edit")}>
                                Edit User
                            </button>
                            <button className="dropdown-item" onClick={() => handleItemClick('Item 2', "delete")}>
                                Delete User
                            </button>
                            {
                                role === "Mentor" ?
                                <button className="dropdown-item" onClick={() => handleItemClick('Item 2', "mentorMentee")}>
                                    Assign Mentee to Mentor
                                </button>:
                                <></>
                            }
                            {
                                role === "Judge" ?
                                <button className="dropdown-item" onClick={() => handleItemClick('Item 2', "judgeMentee")}>
                                    Assign Mentee to Judge
                                </button>:
                                <></>
                            }
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-3">
                <hr/>
            </div>

            <DeleteModal 
                title={name} 
                type={'user'} 
                isModalOut={isDeleteModalOut} 
                setIsModalOut={setIsDeleteModalOut} 
                toggleShow={toggleShowDeleteModal}
                deleteFunction={handleDeleteFunction}
            />
        </>
    )
}

export default UserCard