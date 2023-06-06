import { DefaultProfileIcon } from "../../assets"
import { FaEllipsisV } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button"

const UserManagement = () => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleItemClick = (id, type) => {
        console.log(id,type)
        if (type === "edit") {
            navigate(`/user-management/user-form/${id}`)
        } else {
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
        <div className="py-4 px-4">
            <h1>User Management</h1>
            <Button title={"+ Add User"} navigate={() => navigate('/user-management/user-form')}/>
            <div className="mt-4" style={{ border: '0.5px solid #d3d3d3', borderRadius:'10px'}}>
                <div className="row mt-4 px-4">
                    <div className="col-3">
                        <span style={{color:'gray'}}>Name</span>
                    </div>
                    <div className="col-4">
                    <span style={{color:'gray'}}>Email</span>
                    </div>
                    <div className="col-2">
                    <span style={{color:'gray'}}>Role</span>
                    </div>
                    <div className="col-2">
                    <span style={{color:'gray'}}>Active</span>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                <div className="px-3">
                    <hr/>
                </div>

                <div className="row mt-3 px-4">
                    <div className="col-3">
                        <img src={DefaultProfileIcon}/>    Aji Inisti
                    </div>
                    <div className="col-4 py-1">
                        <p>aji@gmail.com</p>
                    </div>
                    <div className="col-2 py-1">
                        Mentee
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
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default UserManagement