import './Home.css'
import {useEffect} from 'react';

export const Reservation = (props) => {

  useEffect(()=> {
    if (props.today === 2 && props.time >= 7) {
      document.getElementById('tue-morn').classList.add("disabled");
    };
    if (props.today === 2 && props.time >= 18) {
      document.getElementById('tue-eve').classList.add("disabled");
    };
    if (props.today === 4 && props.time >= 7) {
      document.getElementById('thur-morn').classList.add("disabled");
    };
    if (props.today === 4 && props.time >= 18) {
      document.getElementById('thur-eve').classList.add("disabled");
    };
    if (props.today === 6 && props.time >= 16) {
      document.getElementById('sat-after').classList.add("disabled");
    };
  })

  return(
    <div className="reservation-wrapper">
      <form>
        {/* Tuesday Classes */}
        <div className='form-row'>
          <div id='tue-morn' className='col-6'>
            <label> Martes 7am </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
          <div id='tue-eve' className='col-6'>
            <label> Martes 6pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div>
        {/* Thursday Classes */}
        <div className='form-row'>
          <div id='thur-morn' className='col-6'>
            <label> Jueves 7am </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
          <div id='thur-eve' className='col-6'>
            <label> Jueves 6pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div>
        {/* Saturday Class */}
        <div className='form-row'>
          <div id='sat-after' className='col-6'>
            <label> Sábado 4pm </label>
            <button type='button' className='btn btn-warning m-2'> Reservar </button>
          </div>
        </div> 
      </form>
    </div>
  );
};