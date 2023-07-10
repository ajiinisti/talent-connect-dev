import { AiOutlineSearch } from 'react-icons/ai';
import debounce from 'lodash.debounce';

const SearchBar = ({onSubmit, placeholder, onChange}) => {

  const handleInputChange = debounce(event => {
      onChange(event.target.value);
  }, 500);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit()
  };

  return (
    <div className="d-flex flex-column">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          className="form-control border-end-0 border"
          type="search"
          onChange={handleInputChange}
          placeholder={placeholder || "Search Program"}
          style={{ borderRadius: "5px 0 0 5px" }}
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