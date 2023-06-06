import { FaEllipsisH } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const ActivityCard = ({title,styling}) => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isMentor = false
    const isMentee = true

    const handleItemClick = (id, type) => {
        console.log(id,type)
        if (type === "update") {
            navigate(`/program/activity-form/${id}`)
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

    const feedbackButton = {
        color: '#A684F2',
        backgroundColor: 'white'
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    return (
        <div className="card d-flex flex-column gap-4 mt-3" style={{borderRadius: '10px', paddingBottom:styling.bot, paddingTop:styling.top }}>
        <ul className="list-group list-group-flush">
            <div
            className="container d-flex align-items-center justify-content-between px-4 py-5"
            style={{ height: '10vh'}}
            >
                <div className="d-flex flex-column">
                <Link to={'/program/activity-detail/01'}>
                    <h5 style={{ marginBottom: 'auto' }}>{title}</h5>
                </Link>
                <span style={{marginTop: '0.5rem'}}>12.00 - 13.00</span>
                <div style={{ marginTop: '0.5rem' }}>
                    <div className="mirror-icon">
                    <BsPeople style={{ marginLeft: '0.5rem', marginBottom:'0.2rem'}} />
                    </div>
                    <span>All</span>
                </div>
                </div>
                    <div className="container" style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        justifyItems: 'end',
                        alignItems: 'start'
                    }}>
                    <div className="dropdown" ref={dropdownRef} style={{ position: 'relative'}}>
                        <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                        <FaEllipsisH style={{ marginBottom: '0.2rem' }} />
                        </label>
                        {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => handleItemClick('Item 1', "update")}>
                            Update Activity
                            </button>
                            <button className="dropdown-item" onClick={() => handleItemClick('Item 2', "delete")}>
                            Delete Activity
                            </button>
                        </div>
                        )}
                    </div>
                    {
                        isMentor ?
                        <div>
                            <Button title={"Write Feedback"} styling={{ marginRight: '0' }} />
                        </div>:
                        <></>
                    }
                    {
                        isMentee ?
                        <div>
                            <Button title={"See Mentor's Feedback"} styling={feedbackButton} navigate={()=> navigate('/program/mentor-feedback/idd')}/>
                        </div>:
                        <></>
                    }
                </div>
            </div>
        </ul>

        </div>
    );
};

export default ActivityCard;
