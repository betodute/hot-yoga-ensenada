import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Home } from './Home'
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={NotFound} />
      </Routes>  
    </Router> 
  );
}

export default App;
