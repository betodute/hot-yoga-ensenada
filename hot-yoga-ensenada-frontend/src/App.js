import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Home } from './Home'
import { Auth } from './Auth'
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

let randomNum = Math.ceil(Math.random() * 2);

function App() {
  
  if (randomNum === 1) {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    )
  };

  if (randomNum === 2) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
