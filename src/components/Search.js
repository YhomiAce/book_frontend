/* eslint-disable react-hooks/exhaustive-deps */
import React,{useRef,useContext, useEffect} from 'react';
import BookContext from '../context/BookContext';

const Search = () => {
    const text = useRef('');
     const bookContext = useContext(BookContext);
     const { filterBooks, clearFilter, filtered} = bookContext;

     useEffect(()=>{
         if (filtered === null) {
             text.current.value = "";
         }
     },[])

    const changeHandler = e => {
        
        if(text.current.value !== ""){
            filterBooks(e.target.value);
        }else{
            clearFilter()
        }
        
    }
    return (
        <div className="float-right mb-4">
               Search: <input type="text" ref={text} onChange={changeHandler} />
        </div>
    )
}

export default Search
