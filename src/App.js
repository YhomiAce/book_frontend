import React from 'react';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import Books from './components/Books/Books';
import EditBook from './components/Books/EditBook';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Books />}/>
          <Route path="/book/edit/:id" element={<EditBook />} />
        </Routes>
      </Router>
  );
}

export default App;
