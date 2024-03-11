import './Profile.css'
import React, { useState, useEffect } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext.js";

function Greeting() {
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else if (hour >= 18) {
      setGreeting('Good evening');
    }
  }, []);

  return <h1>{greeting}</h1>;
}


export const Profile = () => {

  const { user } = useContext(UserContext);
  const [greeting, setGreeting] = useState('Buen día');

  console.log("ojo object", user)

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 12 && hour < 18) {
      setGreeting('Buenas tardes');
    } else if (hour >= 18) {
      setGreeting('Buenas noches');
    }
  }, []);

  return (
    <div>
      <p className="welcome"> {greeting}, {user ? user.name : 'Cholx'} </p>
    </div>
  )
  
}