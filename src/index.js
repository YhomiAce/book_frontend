import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookState from './context/BookState';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const app = (
    <ErrorBoundary>
    <BookState>
        <App />
    </BookState>
    </ErrorBoundary>
)

ReactDOM.render(app, document.getElementById('root'));


