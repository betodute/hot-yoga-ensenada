import React, { useState, useEffect } from "react";
import './Admin.css';

export const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [comReservations, setComReservations] = useState([]);

  const getReservationDetails = async (reservation) => {
    console.log("this is what a reservation looks like before fetch:", reservation)

    const yogaClassResponse = await fetch(`http://localhost:9000/yogaclass/${reservation.yogaClassID}`);
    const yogaClass = await yogaClassResponse.json();

    const yogiResponse = await fetch(`http://localhost:9000/user/${reservation.userID}`);
    const yogi = await yogiResponse.json();

    return [yogaClass, yogi];
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch('http://localhost:9000/reservation');
      const data = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  const reservationDetails = reservations.map(async (reservation) => {
    const [yogaClass, yogi] = await getReservationDetails(reservation);
    renderDetails({yogaClass, yogi})
  });

  const renderDetails = (reservation) => {
    console.log(reservation.yogaClass.day, reservation.yogaClass.time, reservation.yogi.name)
    if (reservation.yogaClass.day === 'Martes') {
      if (reservation.yogaClass.time === '7am') {
        
      }
    }
    
  };

  return (
    <div className='admin-wrapper'>
      <h3> ADMIN </h3>
      <div className='class-wrapper mt-4'>
        <ul id='mar7'> Martes 7am  </ul>
        <ul id='mar6'> Martes 6pm </ul>
        <ul id='jue7'> Jueves 7am </ul>
        <ul id='jue6'> Jueves 6pm </ul>
        <ul id='sab4'> Sábado 4pm </ul>
      </div>
    </div>
  );
};


