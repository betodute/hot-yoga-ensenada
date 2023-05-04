import './profile.css'
import React, { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext";



export const Profile = () => {

  const { user } = useContext(UserContext);

  return (
    <div>
      <p className="welcome"> Hola, {user.name} </p>
    </div>
  )
  
}