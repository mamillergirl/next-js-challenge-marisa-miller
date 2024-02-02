import React, { useState } from "react";
import BookResult from "./BookResult"
import "../styles/SearchResults.css"; // Import your CSS file for styling

const SearchResults = ({ searchResult, handlePagination, currentPage }) => {

  
  const nextPage = () => {

    handlePagination(currentPage + 1);
  };

  const prevPage = () => {

    handlePagination(currentPage - 1);
  };

  return (
    <div>
      <div className="pagination top">
        <button onClick={prevPage} disabled={currentPage === 1}>
          {'<'}  
        </button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage}>{'>'}</button>
      </div>
      <div className="search-results-container">
        <div className="search-results">
          {searchResult.map((item, key) => (
            <BookResult key={key} book={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
