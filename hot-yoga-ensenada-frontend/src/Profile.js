import React, { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext";



export const Profile = () => {

  const { user } = useContext(UserContext);
  console.log(user)
  
  const handleLogOut = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/logout', {
      method: 'POST',
      body: JSON.stringify({user: user.userName}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => console.log("You are logged out", data))
  };

  return (
    <div>
      <p> Welcome {user.name} </p>
      <button onClick={handleLogOut} type="submit"> Logout </button>
    </div>
  )
  
}