import { FaEllipsisV, FaEllipsisH } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({title, isActivity}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleItemClick = (item) => {
    console.log(item);
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

  return (
    <div className="card d-flex flex-column gap-4 mt-3" style={{ borderRadius: '10px' }}>
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
              <Link to={'/home/activity-list'}>
                <h5 style={{ marginRight: 'auto', marginTop: '0.5rem' }}>{title}</h5>
              </Link>
            </div>:
            <div className="d-flex flex-column">
              <h5 style={{ marginBottom: 'auto' }}>{title}</h5>
              <div style={{ marginTop: 'auto' }}>
                <div className="mirror-icon">
                  <BsPeople style={{ marginLeft: '0.5rem', marginBottom:'0.2rem'}} />
                </div>
                <span>All</span>
              </div>
            </div>
          }
          {
            isActivity === false ?
            <div className="dropdown" ref={dropdownRef}>
              <div className="mirror-icon">
                <BsPeople style={{ marginLeft: '0.2rem', marginBottom: '0.2rem', fontSize: '1.3rem'}} />
              </div>
              <span style={{ marginRight: '0.5rem', fontSize: '0.9rem'}}>23</span>
              <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                <FaEllipsisV style={{ marginBottom: '0.2rem'}}/>
              </label>
              {isDropdownOpen && (
                  <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 1')}>
                      Update
                      </button>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 2')}>
                      Delete
                      </button>
                  </div>
              )}
            </div>:
            <div className="dropdown" ref={dropdownRef}>
              <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
                <FaEllipsisH style={{ marginBottom: '0.2rem'}}/>
              </label>
              {isDropdownOpen && (
                  <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 1')}>
                      Update
                      </button>
                      <button className="dropdown-item" onClick={() => handleItemClick('Item 2')}>
                      Delete
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
