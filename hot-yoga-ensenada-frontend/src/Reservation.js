import './Home.css'

export const Reservation = () => {
  return(
    <div className="reservation-wrapper">
      <form>
          <label className='tue-morning'> Martes 7am </label>
          <button type='button' className='btn btn-warning m-2'> Reservar </button>
          <label> Martes 6pm </label>
          <button type='button' className='btn btn-warning m-2'> Reservar </button>

          <div></div>
        
          <label> Jueves 7am </label>
          <button type='button' className='btn btn-warning m-2'> Reservar </button>
          <label> Jueves 6pm </label>
          <button type='button' className='btn btn-warning m-2'> Reservar </button>

          <div></div>
        
          <label> Sábado 4pm </label>
          <button type='button' className='btn btn-warning m-2'> Reservar </button>
      </form>
    </div>
  );
}

/* let today = new Date();
if (today.getDate() == 0) {
  let tuesday = document.getElementsByClassName("tue-morning")
  tuesday.style.display.none;
}; */