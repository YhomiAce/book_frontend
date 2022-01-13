import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookState from './context/BookState';

const app = (
    <BookState>
        <App />
    </BookState>
)

ReactDOM.render(app, document.getElementById('root'));


