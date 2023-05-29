import { FaEllipsisV } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useState } from 'react';

const Card = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (item) => {
    console.log(item);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="card d-flex flex-column gap-4 mt-3" style={{ borderRadius: '15px' }}>
      <ul className="list-group list-group-flush">
        <div
          className="container d-flex align-items-center justify-content-between px-5 py-5"
          style={{ height: '10vh'}}
        >
          <div className="d-flex align-items-center">
            <h4 style={{ marginRight: 'auto' }}>ITDP SMM Batch 3</h4>
          </div>
          <div className="dropdown">
            <div className="mirror-icon">
            <BsPeople style={{ marginLeft: '0.5rem' }} />
            </div>
            <span style={{ marginRight: '0.5rem' }}>23</span>
            <label htmlFor="dropdown-toggle" className="dropdown-icon" onClick={toggleDropdown}>
              <FaEllipsisV />
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
        </div>
      </ul>
    </div>
  );
};

export default Card;
