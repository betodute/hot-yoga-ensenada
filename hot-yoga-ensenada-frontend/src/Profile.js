import './Profile.css'
import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "./UserContext.js";

export const Profile = () => {

  const { user } = useContext(UserContext);
  const [greeting, setGreeting] = useState('Buen día');

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