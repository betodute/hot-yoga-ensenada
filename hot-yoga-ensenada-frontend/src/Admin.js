import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Admin.css';

export const Admin = () => {
  const [yogaDate, setYogaDate] = useState(new Date());
  const [classActive, setClassActive] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() =>{

    const fetchReservations = async () => {
      const reservationResponse = await fetch('http://localhost:9000/reservation')
      const reservationData = await reservationResponse.json();
      console.log(reservationData);
      setReservations(reservationData);
    }

    fetchReservations();

  }, [])

  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    const day = new Intl.DateTimeFormat('es-ES', options).format(date);
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  async function handleCreateYoga(event) {
    event.preventDefault();

    const yogaDay = getDayOfWeek(yogaDate);
    const yogaTime = yogaDate.toTimeString().split(' ')[0];

    try {
      const response = await fetch('http://localhost:9000/yogaclass', {
        method: 'POST',
        body: JSON.stringify({ 
          yogaDate: yogaDate.toISOString().split('T')[0], 
          yogaDay, 
          yogaTime, 
          classActive 
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
      }

      const json = await response.json();
      console.log("this is the data response in json", json);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (classActive) {
      console.log('this is the date');
      console.log(yogaDate);
    }
  }, [yogaDate]);

  return (
    <div className='admin-wrapper d-flex flex-column align-items-center'>
      <div className='admin-heading w-100 d-flex justify-content-center'>
        <h2>Admin</h2>
      </div>
      <div className='create-yoga-wrapper d-flex justify-content-center'>
        <form className='create-yoga-form' onSubmit={handleCreateYoga}>
          <div className='form-heading'>Create Yoga Class</div>
          <div className='input-wrapper'>
            <div className="form-group custom-datepicker">
              <DatePicker
                className="form-control"
                selected={yogaDate}
                onChange={(date) => setYogaDate(date)}
                dateFormat="dd/MM/yyyy    HH:mm aa"
                placeholderText="Select date and time"
                showTimeSelect
              />
            </div>
          </div>
          <button className='btn btn-warning create-button'>Submit</button>
        </form>
      </div>
      <div className='reservations-wrapper'>
        {reservations.map(({day, time, userName, _id})=> {
          return (
            <p key={`${_id}`}> Day: {day} </p>
          )
        })}
      </div>
    </div>
  );
};

