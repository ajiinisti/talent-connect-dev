import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchValue);
  };

  return (
    <div className="d-flex flex-column gap-4 mt-5">
      <h1>Hello, Alwin!</h1>
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          className="form-control border-end-0 border"
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search"
          style={{ borderRadius: "10px 0 0 10px" }}
        />
        <span className="input-group-append">
          <button
            className="btn btn-outline-secondary bg-white border-start-0 border ms-n5"
            type="submit"
            style={{ borderRadius: "0 10px 10px 0" }}
          >
            <AiOutlineSearch />
          </button>
        </span>
      </form>
    </div>
  );
};

export default SearchBar;