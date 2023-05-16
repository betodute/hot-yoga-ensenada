import React, { useState, useEffect } from "react";
import './Admin.css';


export const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [yogaClasses, setYogaClasses] = useState([]);
  const [yogis, setYogis] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/reservation');
        const reservations = await response.json();
        setReservations(reservations);
        await fetchDetails();
      } catch (error) {
        // Handle error
      }
    };
  
    fetchData();
  }, []);
  
  const fetchDetails = async () => {
    try {
      const fetchPromises = reservations.map(async (reservation) => {
  
        const userResponse = await fetch(`http://localhost:9000/user/${reservation.userID}`);
        const userData = await userResponse.json();
        setYogis((prevYogis) => [...prevYogis, userData]);

  
        const classResponse = await fetch(`http://localhost:9000/yogaclass/${reservation.yogaClassID}`);
        const classData = await classResponse.json();
        setYogaClasses((prevClasses) => [...prevClasses, classData]);
      });
  
      await Promise.all(fetchPromises);
    } catch (error) {
      // Handle error
    }
  };



  return (
    <div className='admin-wrapper'>
      <h3> ADMIN </h3>
      <div className='class-wrapper mt-4'>
        <ul id='mar7'> Martes 7am  </ul>
        {yogaClasses.map((classData, index) => {
          if (classData.day === 'Martes ' && classData.time === '7am') {
            return <li> {yogis[index].name} </li>
          }
          return null;
        })}
        <ul id='mar6'> Martes 6pm </ul>
        {yogaClasses.map((classData, index) => {
          if (classData.day === 'Martes ' && classData.time === '6pm') {
            return <li> {yogis[index].name} </li>
          }
          return null;
        })}
        <ul id='jue7'> Jueves 7am </ul>
        {yogaClasses.map((classData, index) => {
          if (classData.day === 'Jueves ' && classData.time === '7am') {
            return <li> {yogis[index].name} </li>
          }
          return null;
        })}
        <ul id='jue6'> Jueves 6pm </ul>
        {yogaClasses.map((classData, index) => {
          if (classData.day === 'Jueves ' && classData.time === '6pm') {
            return <li> {yogis[index].name} </li>
          }
          return null;
        })}
        <ul id='sab4'> Sábado 4pm </ul>
        {yogaClasses.map((classData, index) => {
          if (classData.day === 'Sábado ' && classData.time === '4pm') {
            return <li> {yogis[index].name} </li>
          }
          return null;
        })}
      </div>
    </div>
  );
};
