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
        case actionTypes.DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload )
            }
        case actionTypes.UPDATE_BOOK:
            const index = state.books.findIndex(book => book.id === action.payload.id);
            // console.log(action.payload.id, index);
            const newArr = [...state.books];
            newArr[index] = action.payload.book
            console.log(newArr);
            return {
                ...state,
                books: newArr
            }
        default: return state;
    }
}

export default BookReducer;