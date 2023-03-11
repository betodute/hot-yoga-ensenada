import { Headline } from './Headline';
import { Quote } from './Quote'
import { Reservation } from './Reservation'
import { Bookclub } from './Bookclub.js'
import React, {useState, useEffect} from 'react';
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
    <div className='container-fluid'>
      <div className='row'>
        <Headline className='col-12'/>
        <div className='image-wrapper text-center'>
          <img className="home-image rounded mx-auto d-block" src={homeImageOne}></img>
        </div>
        <Quote className='col-12'/>
        <Reservation today={today} time={time} className='col-12'/>
        <Bookclub/>
      </div>
    </div>
  )
};