import { React } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext.js";
import { Home } from './Home'
import { Auth } from './Auth'
import { Admin } from './Admin'
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

function App() {
  
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
