import { FaEllipsisH } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/modal/DeleteModal';
import React from 'react';
import useActivityList from './useActivityList';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/button/Button';

const ActivityCard = ({title, styling, activity, programId, isMentoring, isPassed}) => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOut, setIsDeleteModalOut] = useState(false)
    const toggleShowDeleteModal = () => setIsDeleteModalOut(!isDeleteModalOut);
    const { deleteActivity, deleteMentoringSchedule} = useActivityList()
    
    const deleteButton = isMentoring ? deleteMentoringSchedule: deleteActivity
    const type = isMentoring ? "mentoring" : "activity"

    const {getCurrentRole} = useAuth()
    const role = getCurrentRole()
    const isMentor = role.includes("mentor")
    const isAdmin = role.includes("admin")
    // const isMentor = false
    // const isMentee = true

    const handleItemClick = (type) => {
        if (type === "update") {
            navigate(`/program/${programId}/activity-form/${activity.ID}`)
        } else {
            toggleDropdown()
            toggleShowDeleteModal()
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
        deleteButton(activity.ID)
        window.location.reload()
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    return (
        <>
            <div className="card d-flex flex-column gap-4 mt-3" style={{borderRadius: '10px', paddingBottom:styling.bot, paddingTop:styling.top }}>
                <ul className="list-group list-group-flush">
                    <div
                        className="container d-flex align-items-center justify-content-between activity-card"
                        style={{ minHeight: '10vh'}}
                    >
                        <div className="d-flex flex-column activity-card-section-1" style={{justifyContent: "center"}}>
                            <Link to={`/program/activity-detail/${isMentoring}/${activity.ID}/${programId}`}>
                                <h5 style={{ marginBottom: 'auto', width:"10wh%" }}>{title}</h5>
                            </Link>
                            <span style={{marginTop: '0.2rem'}}>{activity.StartDate.slice(11,16)}</span>
                            <div style={{ marginTop: '0.5rem' }}>
                                <div className="mirror-icon">
                                <BsPeople style={{ marginLeft: '0.5rem', marginBottom:'0.2rem'}} />
                                </div>
                                {
                                    isMentoring ? (
                                        <span>
                                        {activity.mentorMentees.map((mentee, index) => (
                                            <React.Fragment key={mentee.Participant.id}>
                                                {mentee.Participant.FirstName} {mentee.Participant.LastName}{", "}
                                            </React.Fragment>
                                        ))}
                                        {activity.mentorMentees[0].Mentor.FirstName} {activity.mentorMentees[0].Mentor.LastName}
                                        </span>
                                    ) : (
                                        <span>All</span>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            justifyItems: 'end',
                            alignItems: 'start'
                        }}>
                            {
                                (isAdmin || isMentoring) && isPassed ?
                                <div className="dropdown" ref={dropdownRef} style={{ position: 'relative'}}>
                                    <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                                    <FaEllipsisH style={{ marginBottom: '0.2rem' }} />
                                    </label>
                                    {
                                        isDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <button className="dropdown-item" onClick={() => handleItemClick("update")}>
                                            Update Activity
                                            </button>
                                            <button className="dropdown-item" onClick={() => handleItemClick("delete")}>
                                            Delete Activity
                                            </button>
                                        </div>
                                        )
                                    }
                                </div>
                                :<></>
                            }
                            {
                                isMentoring && isMentor ?
                                <div>
                                    <Button title={"Write Feedback"} styling={{ marginRight: '0' }} navigate={()=> navigate(`/program/mentor-feedback/${activity.ID}`)}/>
                                </div>:
                                <></>
                            }
                        </div>
                    </div>
                </ul>
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
    );
};

export default ActivityCard;
