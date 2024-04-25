import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [verifyToken, setVerifyToken] = useState("")

  const handleVerifyToken = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/verifyemail', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'verifytoken' : verifyToken 
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === 'success') {
        navigate('/home');
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching reservations:', error);
    });
  };

  return (
    <div className="verify-container">
    <form onSubmit={handleVerifyToken} className="auth-form">
      <div className="verify-content">
        <h5 className="verify-hye">hot yoga ensenada</h5>
        <h4 className="verify-title"> ingresa el código enviado a tu email--omaiga </h4>
        <div className="form-group mt-3">
          <input
            type="input"
            className="form-control mt-1"
            placeholder='código'
            value={verifyToken}
            onChange={(event) => {setVerifyToken(event.target.value)}}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}
