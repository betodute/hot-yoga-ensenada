import './Logout.css'
import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./UserContext.js";

export const Logout = () => {

  const navigate = useNavigate();

  const logoutUser = () => {
    fetch('http://localhost:9000/user/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); 
      navigate('/');
    });
  };

  return (
    <p className="logout-link">
      <a href="#" onClick={logoutUser}> logout </a>
    </p>
  );
};