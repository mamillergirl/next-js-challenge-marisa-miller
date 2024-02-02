"use client";
import React, { useState } from "react";
import "./globals.css";
import SearchBar from "./components/SearchBar";
import searchBooks from "./searchBooks";
import SearchResults from "./components/SearchResults";
import  Header  from "./components/Header";

export default function Home() {
  const [searchResult, setSearchResult] = useState(null);
  const [lastSearchBy, setLastSearchBy] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [lastSortBy, setLastSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (searchBy, searchQuery, sortBy) => {
    setCurrentPage(1);
    try {
      const result = await searchBooks(
        searchBy,
        searchQuery,
        sortBy,
        currentPage
      );
      setLastSearchBy(searchBy);
      setLastSearchQuery(searchQuery);
      setLastSortBy(sortBy);

      setSearchResult(result.docs);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResult(null);
    }
  };
  const handlePagination = async (newPage) => {
    setCurrentPage(newPage);
    try {
      const result = await searchBooks(
        lastSearchBy,
        lastSearchQuery,
        lastSortBy,
        currentPage
      );

      setSearchResult(result.docs);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResult(null);
    }
  };

  return (
    <>
    <Header/>
    <main>

      <SearchBar onSearch={handleSearch} />
      {searchResult && (
        <SearchResults
          handlePagination={handlePagination}
          searchResult={searchResult}
          currentPage={currentPage}
        />
      )}
    </main>
    </>
  );
}
