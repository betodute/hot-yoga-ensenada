import './Schedule.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { YogaClass } from './YogaClass';

export const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useContext(UserContext);
  const existingReservation = ''

  useEffect(() => {

    const fetchClassesAndReservations = async () => {
      try {
        // Fetch the yoga classes
        const classesResponse = await fetch('http://localhost:9000/yogaclass');
        if (!classesResponse.ok) {
          throw new Error(`Classes response status: ${classesResponse.status}`);
        }
        const classesData = await classesResponse.json();
        console.log("these are the classes:", classesData);
        setClasses(classesData);

        // Fetch the user's reservations using POST request with userID in the body
        const reservationsResponse = await fetch('http://localhost:9000/reservation/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: user._id }),
        });

        if (!reservationsResponse.ok) {
          throw new Error(`Reservations response status: ${reservationsResponse.status}`);
        }
        const reservationsData = await reservationsResponse.json();
        console.log("these are the reservations:", reservationsData);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClassesAndReservations();
  }, [user._id]);


  const handleReserve = async (id) => {
    try {

      const existingReservation = reservations.find(reservation => reservation.yogaClassID === id);

      if (existingReservation) {
        console.log("this is what the yogaclass id is within the delete logic:", id)
        console.log("this is what the user id is within the delete logic", user._id)

        // Cancel reservation (DELETE request)
        const response = await fetch('http://localhost:9000/reservation/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: user._id,
            yogaClassID: id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to cancel the reservation');
        }

        setReservations(prevReservations =>
          prevReservations.filter(reservation => reservation.yogaClassID !== id)
        );

        console.log('Reservation canceled successfully.');
      } else {
        // Make reservation (POST request)
        const response = await fetch('http://localhost:9000/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: user._id,
            yogaClassID: id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to reserve the class');
        }

        const newReservation = await response.json();

        setReservations(prevReservations => [...prevReservations, newReservation]);

        console.log('Reservation successful.');
      }
    } catch (error) {
      console.error(existingReservation ? 'Error canceling the reservation:' : 'Error reserving the class:', error);
    }
  };


  return (
    <div className='schedule-container'>
      <div className='classes-container row'>
        {classes.map(({ _id, day, time }) => {
          const reserved = reservations.some((reservation) => reservation.yogaClassID === _id);
          return (
            <YogaClass
              key={_id}
              title={`${day} ${time}`}
              reserved={reserved}
              onReserve={() => handleReserve(_id)}
            />
          );
        })}
      </div>
    </div>
  );
};





