import React, { useState } from "react"
import './Auth.css';

export const Auth = () => {

  let [authMode, setAuthMode] = useState("signin");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [regUserName, setRegUserName] = useState("");
  let [regPhoneNumber, setRegPhoneNumber] = useState("");
  let [regUserEmail, setRegUserEmail] = useState("");
  let [regUserPassword, setRegUserPassword] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // This is where the dashboard Get Request goes 
    
    
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:9000/users', {
      method: 'POST',
      body: JSON.stringify({regUserName, regPhoneNumber, regUserEmail, regUserPassword}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  };

  if (authMode === "signin") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">Hot Yoga Ensenada</h5>
            <h3 className="auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
              Regístrese
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={userEmail}
                onChange={(event) => {setUserEmail(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={userPassword}
                onChange={(event) => {setUserPassword(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleRegisterSubmit}>
        <div className="auth-form-content">
          <h5 className="auth-form-hye">Hot Yoga Ensenada</h5>
          <h3 className="auth-form-title">Regístrese</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Marco Antonio Solis"
              value={regUserName}
              onChange={(event) => {setRegUserName(event.target.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control mt-1"
              placeholder="(646) 555-5555"
              value={regPhoneNumber}
              onChange={(event) => {setRegPhoneNumber(event.target.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={regUserEmail}
              onChange={(event) => {setRegUserEmail(event.target.value)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={regUserPassword}
              onChange={(event) => {setRegUserPassword(event.target.value)}}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )

};