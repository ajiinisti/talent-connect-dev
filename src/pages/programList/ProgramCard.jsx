import { FaEllipsisV } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/modal/DeleteModal';

const ProgramCard = ({title,styling,toogleModalUpdate}) => {
    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isJudge = false
    const [isDeleteModalOut, setIsDeleteModalOut] = useState(false)
    const toggleShowDeleteModal = () => setIsDeleteModalOut(!isDeleteModalOut);

    const handleItemClick = (id, type) => {
        console.log(id,type)
        if (type === "edit") {
          navigate(`/program/program-form/${id}`)
        } else if (type === "delete") {
          toggleDropdown()
          toggleShowDeleteModal()
        } else{
          toggleDropdown()
          toogleModalUpdate()
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


    return (
      <>
        <div className="card d-flex flex-column gap-4 mt-3" style={{borderRadius: '10px', paddingBottom:styling.bot, paddingTop:styling.top }}>
          <ul className="list-group list-group-flush">
            <div
              className="container d-flex align-items-center justify-content-between px-4 py-5"
              style={{ height: '10vh'}}
            >
                <div className="d-flex align-items-center">
                  <div className="box-program-list" style={{marginRight: '1rem'}}>
                    S
                  </div>
                  {
                    isJudge ? 
                    <Link to={'/program/evaluate-participant/id'}>
                      <h5 style={{ marginRight: 'auto', marginTop: '0.5rem' }}>{title}</h5>
                    </Link> :
                    <Link to={'/program/activity-list'}>
                      <h5 style={{ marginRight: 'auto', marginTop: '0.5rem' }}>{title}</h5>
                    </Link> 
                  }
                </div>
                <div>
                  <div className="mirror-icon">
                    <BsPeople style={{ marginLeft: '0.2rem', marginBottom: '0.2rem', fontSize: '1.3rem'}} />
                  </div>
                  <span style={{ marginRight: '0.5rem', fontSize: '0.9rem'}}>23</span>
                  <div className="dropdown" ref={dropdownRef}>
                    <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                      <FaEllipsisV style={{ marginBottom: '0.2rem'}}/>
                    </label>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                          <button className="dropdown-item" onClick={() => handleItemClick('Item 1', "add")}>
                          Add Participant
                          </button>
                          <button className="dropdown-item" onClick={() => handleItemClick('Item 2', "edit")}>
                          Edit Program
                          </button>
                          <button className="dropdown-item" onClick={() => handleItemClick('Item 3', "delete")}>
                          Delete Program
                          </button>
                        </div>
                    )}
                  </div>
                </div>
            </div>
          </ul>
        </div>
        
        <DeleteModal 
          title={title} 
          type={'program'} 
          isModalOut={isDeleteModalOut} 
          setIsModalOut={setIsDeleteModalOut} 
          toggleShow={toggleShowDeleteModal}
          deleteFunction={handleDeleteFunction}
        />
      </>
        
    );
}

export default ProgramCard