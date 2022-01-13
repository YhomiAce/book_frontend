/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import BookContext from "../../context/BookContext";
const URL = 'http://localhost:8000';

const EditBook = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    authors: "",
    number_of_pages: 0,
    publisher: "",
    country: "",
    release_date: "",
    isbn: "",
  });
  const [loading, setLoading] = useState(false);

  const { updateBook, getBooks } = useContext(BookContext);

  useEffect(() => {
    getBooks();
    fetchBookById();
  }, []);

  const {
    name,
    authors,
    number_of_pages,
    publisher,
    country,
    release_date,
    isbn,
  } = inputs;

  const fetchBookById = async () => {
    const url = `${URL}/api/books/${id}`;
    try {
      setLoading(true);
      const request = await axios.get(url);
      const response = request.data.data;
      console.log(response);
      setInputs({
        name: response.name,
        isbn: response.isbn,
        country: response.country,
        number_of_pages: response.number_of_pages,
        publisher: response.publisher,
        release_date: response.release_date,
        authors: response.authors.join(", "),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const changeHander = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) =>{
      e.preventDefault();
      const convertedAuthors = authors.split(',');
      const payload = {
          name,
          authors: convertedAuthors,
          country,
          isbn,
          release_date,
          publisher,
          number_of_pages
      };
      updateBook(id, payload);
      setTimeout(()=>{
        navigate('/')
      }, 2000)
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        {loading ? (
          <Spinner />
        ) : (
          <div className="card">
            <div className="card-header">
              <button onClick={() => navigate("/")} className="btn btn-dark">
                Back
              </button>
              <h4 className="text-center"> Edit Book </h4>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="name">Book Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={changeHander}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="isbn">ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={isbn}
                    onChange={changeHander}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authors">Authors</label>
                  <textarea
                    name="authors"
                    className="form-control"
                    cols="15"
                    rows="3"
                    value={authors}
                    onChange={changeHander}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={changeHander}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publisher">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    className="form-control"
                    value={publisher}
                    onChange={changeHander}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberofpages">Number of Pages</label>
                  <input
                    type="number"
                    name="number_of_pages"
                    className="form-control"
                    value={number_of_pages}
                    onChange={changeHander}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="releasedDate">Released Date</label>
                  <input
                    type="date"
                    name="release_date"
                    className="form-control"
                    value={release_date}
                    onChange={changeHander}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Update Book{" "}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;
