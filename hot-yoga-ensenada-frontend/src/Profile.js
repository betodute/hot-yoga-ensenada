import React, { useState } from "react"



export const Profile = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/logout', {
      method: 'POST',
      body: JSON.stringify({username: "whatever"}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => console.log("You are logged out", data))
  };

  return (
    <div>
      <p> Welcome User Name Here </p>
      <button onClick={handleSubmit} type="submit"> Logout </button>
    </div>
  )
}