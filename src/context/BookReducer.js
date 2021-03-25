import * as actionTypes from './action';

const BookReducer = (state, action) =>{
    switch (action.type) {
        case actionTypes.FETCH_BOOKS:
            return{
                ...state,
                books: action.payload,
                loading: false
            }
        case actionTypes.ERROR:
            return{
                ...state,
                loading: false
            }
        case actionTypes.FILTER_BOOKS:
           return {
                ...state,
                filtered: state.books.filter(book=>{
                const regex = new RegExp(`${action.payload}`,'gi')
                return book.name.match(regex)
                })
            }
        case actionTypes.CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }
        default: return state;
    }
}

export default BookReducer;