/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useContext, useState} from 'react';
import moment from 'moment';
import BookContext from '../context/BookContext';
import Spinner from './Spinner/Spinner';
import Paginate from './pagination/paginate';

const Output = () => {
    const bookContext = useContext(BookContext);
    const { books, getBooks,loading, filtered} = bookContext;
    useEffect(()=>{
        getBooks();
    },[]);
    const [currentPage,setCurrentPage] = useState(1);
    const [bookPerPage,setBookPerPage] = useState(10);
    
    if (loading) {
        return <Spinner />
    }

    let CurrentBook;
    if (books !== null) {
        const indexofLastPage = currentPage * bookPerPage;
        const indexOfFirstPage = indexofLastPage- bookPerPage;
         CurrentBook = books.slice(indexOfFirstPage,indexofLastPage);
    }

    const paginate = (pageNumber)=>setCurrentPage(pageNumber)
    return (
        <div>
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
                    {
                        filtered !== null ? filtered.map(book=>(
                            <tr key={book.isbn}>
                                <td> {book.name} </td>
                                <td> {book.isbn} </td>
                                <td> {book.authors} </td>
                                <td> {book.number_of_pages} </td>
                                <td> {book.country} </td>
                                <td> {moment(book.released).format('YYYY-MM-DD')} </td>
                                <td></td>
                            </tr>
                        )) :
                        CurrentBook.map( book => (
                            <tr key={book.isbn}>
                                <td> {book.name} </td>
                                <td> {book.isbn} </td>
                                <td> {book.authors} </td>
                                <td> {book.number_of_pages} </td>
                                <td> {book.country} </td>
                                <td> {moment(book.released).format('YYYY-MM-DD')} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Paginate postPerPage={bookPerPage} totalPost={books.length} paginate={paginate} />
        </div>
    )
}

export default Output;
