import { Headline } from './Headline'
import { Quote } from './Quote'
import { Reservation } from './Reservation'
import React, { useState, useEffect } from 'react'
import homeImageOne from './images/original.png'
import './Home.css'

export const Home = () => {

  const [today, setToday] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setToday(new Date().getDay());
    setTime(new Date().getHours());
  });
 
  return(
    <div className='container'>
      <div className='row'>
        <Headline className='col-12'/>
        <div className='image-wrapper text-center'>
          <img className="home-image mx-auto d-block" src={homeImageOne}></img>
        </div>
        <Quote className='col-12'/>
        <Reservation today={today} time={time} className='col-12'/>
      </div>
    </div>
  );

};