import "./Bookclub.css"

export const Bookclub = () => {
  return(
    <div className='book-wrapper'>
      <div className='row'>
        <h4 className='col-12'> Book Club: BOOK TITLE - by Book Author </h4>
        <h5 className='col-12'> por 3 sábados empezando el primero de abril 2023 </h5>
        <button type='button' className='btn btn'> RESERVA </button>
      </div>
    </div>
  )
}