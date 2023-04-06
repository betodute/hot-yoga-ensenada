import './Reservation.css'
import { YogaClass } from './YogaClass'
import {useEffect, useRef, useState} from 'react';

export const Reservation = (props) => {

  const tueMorn = useRef(null);
  const tueEve = useRef(null);
  const thurMorn = useRef(null);
  const thurEve = useRef(null);
  const satAfter = useRef(null);

  const weekOfClasses = [
    {day: "Martes ", time: "7am", caldate: "01/01/2023"},
    {day: "Martes ", time: "6pm", caldate: "01/01/2023"},
    {day: "Jueves ", time: "7am", caldate: "01/01/2023"},
    {day: "Jueves ", time: "6pm", caldate: "01/01/2023"},
    {day: "Sábado ", time: "4pm", caldate: "01/01/2023"},
  ];
  

  const reserveClass = () => {
    
    let userID = "sample-001"

    fetch('http://localhost:9000/reservations', {
      method: 'POST',
      body: JSON.stringify({userID}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
  
  
   
  useEffect(() => {

    // If Saturday and after 4:00pm

    if (props.today === 6 && props.time >= 16) {
      satAfter.current.classList.add('disabled');
    };

    // If Thursday or Greater Than Thursday

    if (props.today >= 4) {
      if (props.today > 4 || props.time >= 18) {
        thurEve.current.classList.add('disabled');
      };
      if (props.today > 4 || props.time >= 7) {
        thurMorn.current.classList.add('disabled');
      };
    }

    // If Tuesday or Greater Than Tuesday

    if (props.today >= 2) {
      if (props.today > 2 || props.time >= 18) {
        tueEve.current.classList.add('disabled');
      };
      if (props.today > 2 || props.time >= 7 ) {
        tueMorn.current.classList.add('disabled');
      };
    };

  })

  // Obviously I need to create the YogaClass component still

  return(
    <div className="reservation-wrapper">
      <form>
        {/* Tuesday Classes */}

        <div className='form-row'>
          <div ref={tueMorn} className='yoga-class col-6'>
            <YogaClass singleClass={weekOfClasses[0]} />
          </div>
          <div ref={tueEve} className='yoga-class col-6'>
            <YogaClass singleClass={weekOfClasses[1]} />
          </div>
        </div>

        {/* Thursday Classes */}

        <div className='form-row'>
          <div ref={thurMorn} className='yoga-class col-6'>
            <YogaClass singleClass={weekOfClasses[2]} />
          </div>
          <div ref={thurEve} className='yoga-class col-6'>
            <YogaClass singleClass={weekOfClasses[3]} />
          </div>
        </div>
     
        {/* Saturday Class */}
      
        <div className='form-row'>
          <div ref={satAfter} className='yoga-class col-6'>
            <YogaClass singleClass={weekOfClasses[4]} />
          </div>
        </div>
     
      </form>
    </div>
  );

};