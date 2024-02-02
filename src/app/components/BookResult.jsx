import React, { useState, lazy, Suspense } from "react";
import LazyImage from "./LazyImage";
import "../styles/BookResult.css";

export default function BookResult({ book }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectBook = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`book-container ${isSelected ? "selected" : ""}`}
      onClick={handleSelectBook}
    >
      {isSelected ? (
        <div className="book-quick-view">
          <Suspense fallback={<div>Loading...</div>}>
            {book.cover_i && (
              <LazyImage
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="book-cover"
              />
            )}
          </Suspense>
          <div className="book-details">
            <h2>{book.title}</h2>
            <p className="author">
              <strong>Author(s):</strong>{" "}
              {Array.isArray(book.author_name)
                ? book.author_name.join(", ")
                : book.author_name}
            </p>
            <p className="publication">
              <strong>Publication Date:</strong> {book.first_publish_year}
            </p>
            {book.ratings_average && (
              <p className="rating">
                <strong>Average Rating:</strong>{" "}
                {book.ratings_average.toFixed(1)}
              </p>
            )}
            {Array.isArray(book.subject) && (
              <p className="subject">
                <strong>Subjects:</strong> {book.subject.slice(0, 5).join(", ")}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="quick-detail">
          <h2>{book.title}</h2>
          <p className="author">
            {Array.isArray(book.author_name)
              ? book.author_name.join(", ")
              : book.author_name}
          </p>
          <p className="publication">{book.first_publish_year}</p>
        </div>
      )}
    </div>
  );
}
