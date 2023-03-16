import './Reservation.css'
import {useEffect, useRef} from 'react';

export const Reservation = (props) => {

  const tueMorn = useRef(null);
  const tueEve = useRef(null);
  const thurMorn = useRef(null);
  const thurEve = useRef(null);
  const satAfter = useRef(null);
  
   
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
          <div ref={tueMorn} className='col-6'>
            <label> Martes 7am </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
          <div ref={tueEve} className='col-6'>
            <label> Martes 6pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div>
        {/* Thursday Classes */}
        <div className='form-row'>
          <div ref={thurMorn} className='col-6'>
            <label> Jueves 7am </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
          <div ref={thurEve} className='col-6'>
            <label> Jueves 6pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div>
        {/* Saturday Class */}
        <div className='form-row'>
          <div ref={satAfter} className='col-6'>
            <label> Sábado 4pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div> 
      </form>
    </div>
  );
};