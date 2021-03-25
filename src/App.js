import React from 'react';
import Output from './components/Output';
import Search from './components/Search';
import BookState from './context/BookState';

const App = () => {
  return (
    <BookState>
      <div className="container mt-5">
        <Search />
        <Output />
    </div>
    </BookState>
  );
}

export default App;
