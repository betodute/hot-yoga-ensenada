import React, { useState, useEffect } from "react"
import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext.js";
import './VerifyToken.css';

export const VerifyToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  const [verifyToken, setVerifyToken] = useState("")
  const [verifyType, setVerifyType] = useState(location.state?.verifyType || "registerEmail");

  useEffect(() => {
    if (location.state?.verifyType) {
      setVerifyType(location.state.verifyType);
    }
  }, [location.state?.verifyType]);

  const handleVerifyToken = (event) => {
    event.preventDefault();
    console.log("this is the verify type", verifyType)
    
    fetch('http://localhost:9000/user/verifytoken', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'verifytoken' : verifyToken 
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === 'success' && verifyType === 'registerEmail') {
        setUser(data.user)
        navigate('/home');
      }
      if (data.response === 'success' && verifyType ==='newPass') {
        navigate('/', { state: { authMode: 'renderNewPassword' } } )
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
