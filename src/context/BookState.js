import React, {useReducer} from 'react';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import * as actionTypes from './action';
import axios from 'axios';
const URL = "http://localhost:8000"

const BookState = props => {
    const initialState = {
        books: null,
        loading: true,
        filtered: null
    };

    const [state, dispatch] = useReducer(BookReducer, initialState);

    const getBooks = async() =>{
        try {
            const url = `${URL}/api/books`
            const result = await axios.get(url);
            console.log(result.data);
            dispatch({type:actionTypes.FETCH_BOOKS, payload: result.data.data})
        } catch (error) {
            dispatch({type: actionTypes.ERROR, payload: error})
        }
    }

    const filterBooks =  text =>{
        dispatch({type: actionTypes.FILTER_BOOKS, payload: text})
    }

    const clearFilter = ()=>{
        dispatch({type: actionTypes.CLEAR_FILTER})
    }

    const deleteBook = async(id) => {
        try {
            const deleteUrl = `${URL}/api/books/${id}`
            const result = await axios.delete(deleteUrl);
            console.log(result.data);
            dispatch({type:actionTypes.DELETE_BOOK, payload: id})
        } catch (error) {
            dispatch({type: actionTypes.ERROR, payload: error})
        }
    }

    const updateBook = async(id, payload) => {
        try {
            const deleteUrl = `${URL}/api/books/${id}`
            const result = await axios.patch(deleteUrl, payload);
            console.log(result.data);
            dispatch({type:actionTypes.UPDATE_BOOK, payload: { id: id, book: result.data.data}});
            // getBooks();
        } catch (error) {
            dispatch({type: actionTypes.ERROR, payload: error})
        }
    }

    return(
        <BookContext.Provider value={{
            books: state.books,
            loading: state.loading,
            filtered: state.filtered,
            getBooks,
            filterBooks,
            clearFilter,
            deleteBook,
            updateBook
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState;