import './Logout.css'
import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "./UserContext.js";

export const Logout = () => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    fetch('http://localhost:9000/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.id)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); 
      navigate('/');
    });
  };

  return(
    <p className="logout-link"> <a href="#" onClick={(logoutUser)}> logout </a> </p>
  )
}