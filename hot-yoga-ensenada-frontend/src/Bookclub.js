import "./Bookclub.css"
import React, { useState, useEffect } from "react";

export const Bookclub = () => {
  const [data, setData] = useState([]);
  const [userGet, setUserGet] = useState([]);
  const [userPost, setUserPost] = useState([]);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((response) => response.text())
      .then((data) => setData(data));

    fetch('http://localhost:9000/users')
      .then((response) => response.text())
      .then((data) => setUserGet(data));
    
    fetch('http://localhost:9000/users', requestOptions)
      .then((response) => response.text())
      .then((data) => setUserPost(data));
    
  }, []);

  return(
    <div className='book-wrapper'>
      <div className='row'>
        <h4 className='col-12'> API TESTING COMPONENT </h4>
        <h5> {data} </h5>
        <h5> {userGet} </h5>
        <h5> {userPost} </h5>
      </div>
    </div>
  )
}