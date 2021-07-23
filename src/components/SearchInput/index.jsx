import './style.css';

export const SearchInput = ({ searchValue, handleChange }) => (
  <input
    className='search-input'
    onChange={handleChange}
    value={searchValue}
    type='search'
    placeholder="Type your search"
  />
);
