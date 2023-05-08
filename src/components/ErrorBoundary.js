import React from 'react';



class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can log the error or handle it in a specific way
      console.error(error, errorInfo);
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        // Render a fallback UI when an error occurs
        return <h1>Something went wrong.</h1>;
      }
      // Render the children components normally
      return this.props.children;
    }
  }
  export default ErrorBoundary;



