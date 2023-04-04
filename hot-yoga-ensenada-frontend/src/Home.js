import { Headline } from './Headline'
import { Quote } from './Quote'
import { Reservation } from './Reservation'
import React, { useState, useEffect } from 'react'
import homeImageOne from './images/original.png'
import './Home.css'

export const Home = () => {

  const [today, setToday] = useState('');
  const [date, setDate] = useState('')
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
  });

  const testYogaClasses = () => {
    setToday(new Date().getDay());
    setDate(new Date);
    setDay(new Date().getDay());
    setTime(new Date().getHours());
    fetch('http://localhost:9000/yogaclasses', {
      method: 'POST',
      body: JSON.stringify({date, day, time}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => console.log(data)) 
  };
 
  return(
    <div className='container'>
      <div className='row'>
        <Headline className='col-12'/>
        <div className='image-wrapper text-center'>
          <img className="home-image mx-auto d-block" src={homeImageOne}></img>
        </div>
        <Quote className='col-12'/>
        <button onClick={() => {testYogaClasses()}}> 
          Test Yoga Classes
        </button>
        <Reservation today={today} time={time} className='col-12'/>
      </div>
    </div>
  );

};