import React, {useReducer} from 'react';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import * as actionTypes from './action';
import axios from 'axios';
const url = "https://www.anapioficeandfire.com/api/books"

const BookState = props => {
    const initialState = {
        books: null,
        loading: true,
        filtered: null
    };

    const [state, dispatch] = useReducer(BookReducer, initialState);

    const getBooks = async() =>{
        try {
            const result = await axios.get(url)
            dispatch({type:actionTypes.FETCH_BOOKS, payload: result.data})
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

    return(
        <BookContext.Provider value={{
            books: state.books,
            loading: state.loading,
            filtered: state.filtered,
            getBooks,
            filterBooks,
            clearFilter
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState;