import { FaEllipsisV, FaEllipsisH } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProgramList from '../../pages/programList/ProgramFunction';

const Card = ({title, isActivity ,styling}) => {
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const {toggleModal, isModalDeleteOpen} = useProgramList()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (id, isActivity, type) => {
    console.log(id,isActivity,type)
    if (isActivity) {
      if (type === "update") {
        navigate(`/home/program/activity-form/${id}`)
      } else {
        toggleModal()
      }
    }else{
      if (type === "update") {
        navigate(`/home/program/program-form/${id}`)
      } else if (type === "delete") {
        toggleDropdown()
        console.log(isModalDeleteOpen)
        toggleModal()
        console.log(isModalDeleteOpen)
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

  useEffect(() => {
    if (!isModalDeleteOpen) {
      setIsDropdownOpen(false);
    }
  }, [isModalDeleteOpen]);
  
  return (
    <div className="card d-flex flex-column gap-4 mt-3" style={{borderRadius: '10px', paddingBottom:styling.bot, paddingTop:styling.top }}>
      <ul className="list-group list-group-flush">
        <div
          className="container d-flex align-items-center justify-content-between px-4 py-5"
          style={{ height: '10vh'}}
        >
          {
            isActivity === false ?
            <div className="d-flex align-items-center">
              <div className="box-program-list" style={{marginRight: '1rem'}}>
                S
              </div>
              <Link to={'/home/program/activity-list'}>
                <h5 style={{ marginRight: 'auto', marginTop: '0.5rem' }}>{title}</h5>
              </Link>
            </div>:
            <div className="d-flex flex-column">
              <Link to={'/home/program/activity-detail/01'}>
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
          }
          {
            isActivity === false ?
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
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 1', false, "add")}>
                      Add Participant
                      </button>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 2', false, "update")}>
                      Update Program
                      </button>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 3', false, "delete")}>
                      Delete Program
                      </button>
                    </div>
                )}
              </div>
            </div>:
            <div className="dropdown" ref={dropdownRef}>
              <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                <FaEllipsisH style={{ marginBottom: '0.2rem'}}/>
              </label>
              {isDropdownOpen && (
                  <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0 }}>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 1', true, "update")}>
                      Update Activity
                      </button>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 2', true, "delete")}>
                      Delete Activity
                      </button>
                  </div>
              )}
            </div>
          }
        </div>
      </ul>

    </div>
  );
};

export default Card;
