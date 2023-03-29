import "./Bookclub.css"
import React, { useState, useEffect } from "react";

export const Bookclub = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);

  return(
    <div className='book-wrapper'>
      <div className='row'>
        <h5> {data} </h5>
        <h4 className='col-12'> Book Club: BOOK TITLE - by Book Author </h4>
        <h5 className='col-12'> por 3 sábados empezando el primero de abril 2023 </h5>
        <button type='button' className='btn btn'> RESERVA </button>
      </div>
    </div>
  )
}