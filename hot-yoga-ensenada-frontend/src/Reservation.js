import './Home.css'

export const Reservation = () => {
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

componentDidMount(){
  
}


/* function updateTest () {
  let today = new Date();
  if (today.getDay() === 1) {
    document.getElementById('tue-morn').addClass('disabled');
    return;
  };
};

updateTest(); */