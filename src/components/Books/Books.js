/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import BookContext from "../../context/BookContext";
import Spinner from "../Spinner/Spinner";
import Paginate from "../pagination/paginate";
import BookItem from "./BookItem";
import Search from "../Search";

const Books = () => {
  const bookContext = useContext(BookContext);
  const { books, getBooks, loading, filtered } = bookContext;
  useEffect(() => {
    getBooks();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage, setBookPerPage] = useState(10);

  if (loading) {
    return <Spinner />;
  }

  let CurrentBook;
  if (books !== null) {
    const indexofLastPage = currentPage * bookPerPage;
    const indexOfFirstPage = indexofLastPage - bookPerPage;
    CurrentBook = books.slice(indexOfFirstPage, indexofLastPage);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <Search />
      <div className="mt-3">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>ISBN</th>
              <th>Authors</th>
              <th>Pages</th>
              <th>Country</th>
              <th>Released</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered !== null
              ? filtered.map((book) => <BookItem key={book.isbn} book={book} />)
              : CurrentBook.map((book) => (
                  <BookItem key={book.isbn} book={book} />
                ))}
          </tbody>
        </table>
        <Paginate
          postPerPage={bookPerPage}
          totalPost={books.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Books;
