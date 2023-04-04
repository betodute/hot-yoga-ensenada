import './Reservation.css'
import {useEffect, useRef, useState} from 'react';

export const Reservation = (props) => {

  const tueMorn = useRef(null);
  const tueEve = useRef(null);
  const thurMorn = useRef(null);
  const thurEve = useRef(null);
  const satAfter = useRef(null);

  // So this structure works but put each <YogaClass /> in its own component
  // I don't need to populate the reservation structure I have now with the actual API class instances
  // I can simply match the active week with each day in the API  

  const reserveClass = (yogaClassID) => {

    // When reserveClass is clicked the USERID can be added to the appropriate class of the current week. 
    // The list of class day and time with the corresponding YogaClassDB ID can be listed here to be
    // Passed down for the Reservation Post
    
    let userID = "sample-001"

    fetch('http://localhost:9000/reservations', {
      method: 'POST',
      body: JSON.stringify({userID, yogaClassID}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  }

  const [classReserved, setClassReserved] = useState('');
  
   
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

  return(
    <div className="reservation-wrapper">
      <form>
        {/* Tuesday Classes */}
        <div className='form-row'>
          <div ref={tueMorn} className='col-5'>
            <label> Martes 7am </label>
            <button type='button' className='btn btn-warning m-2' onClick={()=>{reserveClass('tueMorn')}}> Reservar </button>
          </div>
          <div ref={tueEve} className='col-6'>
            <label> Martes 6pm </label>
            <button type='button' className='btn btn-warning m-2' onClick={()=>{reserveClass('tueEve')}}> Reservar </button>
          </div>
        </div>
        {/* Thursday Classes */}
        <div className='form-row'>
          <div ref={thurMorn} className='col-6'>
            <label> Jueves 7am </label>
            <button type='button' className='btn btn-warning m-2' onClick={()=>{reserveClass('thurMorn')}}> Reservar </button>
          </div>
          <div ref={thurEve} className='col-6'>
            <label> Jueves 6pm </label>
            <button type='button' className='btn btn-warning m-2' onClick={()=>{reserveClass('thurEve')}}> Reservar </button>
          </div>
        </div>
        {/* Saturday Class */}
        <div className='form-row'>
          <div ref={satAfter} className='col-6'>
            <label> Sábado 4pm </label>
            <button type='button' className='btn btn-warning m-2' onClick={()=>{reserveClass('satAfter')}}> Reservar </button>
          </div>
        </div> 
      </form>
    </div>
  );
};