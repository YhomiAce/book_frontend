import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import BookContext from "../../context/BookContext";

const BookItem = ({ book }) => {
  const { deleteBook } = useContext(BookContext);
  return (
    <tr key={book.isbn}>
      <td> {book.name} </td>
      <td> {book.isbn} </td>

      <td>
        {book.authors.map((author, i) => (
          <span key={author}>
            {book.authors[i + 1] ? author + ", " : author}
          </span>
        ))}
      </td>
      <td> {book.number_of_pages} </td>
      <td> {book.country} </td>
      <td> {moment(book.release_date).format("YYYY-MM-DD")} </td>
      <td>
        <Link to={`/book/edit/${book.id}`} className="btn btn-primary mr-2">
          Edit
        </Link>
        <button onClick={() => deleteBook(book.id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BookItem;
