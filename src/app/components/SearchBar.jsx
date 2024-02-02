import React, { useState } from 'react';
import '../styles/SearchBarStyles.css';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('q');
  const [sortBy, setSortBy] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSearch = async () => {
    onSearch(searchBy, searchQuery, sortBy);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className='search'>
        <div className='search-container'>
          <input
            type="text"
             id ="search-input"
            placeholder={`Search for books...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch className='search-icon' /> {/* Search icon */}
          </button>
        </div>
        <div className='advanced-options'>
          <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
            {showAdvancedOptions ? 'Hide Advanced' : 'Show Advanced'}
          </button>
          {showAdvancedOptions && (
            <div className="advanced-options-content">
              <label>Search By:
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="q">Standard</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                </select>
              </label>
              <label>Sort By:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Relevance</option>
                  <option value="&sort=new">Newest</option>
                  <option value="&sort=old">Oldest</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
