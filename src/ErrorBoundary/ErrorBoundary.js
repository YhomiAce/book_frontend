import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }

    static getDerivedStateFromError (error) {
        return {
            hasError: true
        }
    }

    componentDidCatch (error, info) {
        console.log(error);
        console.log(info);
    }
    
    render() {
        if (this.state.hasError) {
            return <h3>Something Went Wrong</h3>
        }
        return this.props.children;
    }
}

export default ErrorBoundary
