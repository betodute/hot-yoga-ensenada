import React, { useState } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import { useNavigate } from 'react-router-dom';
import './Auth.css';


export const Auth = () => {
  
  const navigate = useNavigate();
  let { setUser } = useContext(UserContext);

  let [authMode, setAuthMode] = useState("signin");
  let [username, setUserEmail] = useState("");
  let [password, setUserPassword] = useState("");
  let [regUserName, setRegUserName] = useState("");
  let [regPhoneNumber, setRegPhoneNumber] = useState("");
  let [regUserEmail, setRegUserEmail] = useState("");
  let [regUserPassword, setRegUserPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    })
    .then((user) => {
      // this is where the USER is defined for app context, it is done upon submission
      // remember that setUser here is defined in the state of UserContext.js
      console.log("RIGHT BEFORE SET USER THIS IS THE USER:", user)
      setUser(user); 
      navigate('/home');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/registeruser', {
      method: 'POST',
      body: JSON.stringify({regUserName, regPhoneNumber, regUserEmail, regUserPassword}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Registration failed.');
      }
    })
    .then((user) => {
      setUser(user); 
      navigate('/home');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  if (authMode === "signin") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h3 className="auth-form-title">Login</h3>
            <div className="text-center">
            ¿ No Tienes Cuenta ? {" "}
              <span className="link-primary" onClick={() => setAuthMode("register")}>
              Regístrate
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={username}
                onChange={(event) => {setUserEmail(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {setUserPassword(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-3">
              <a href="#" onClick={() => setAuthMode("forgot")}>restablecer contraseña</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "register") {
    return (
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h3 className="auth-form-title">Regístrate</h3>
            <div className="text-center">
            ¿ Ya Registradx ? {" "}
              <span className="link-primary" onClick={() => setAuthMode("signin")}>
                Login
              </span>
            </div>
            <div className="form-group mt-3">
              <label>nombre</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Marco Antonio Solis"
                value={regUserName}
                onChange={(event) => {setRegUserName(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>teléfono</label>
              <input
                type="tel"
                className="form-control mt-1"
                placeholder="(646) 555-5555"
                value={regPhoneNumber}
                onChange={(event) => {setRegPhoneNumber(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={regUserEmail}
                onChange={(event) => {setRegUserEmail(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={regUserPassword}
                onChange={(event) => {setRegUserPassword(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "forgot") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h4 className="auth-form-title">Restablecer Contraseña</h4>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={username}
                onChange={(event) => {setUserEmail(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className=" mt-3 text-center">
            Back to {" "}
              <span className="link-primary" onClick={() => setAuthMode("signin")}>
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }

};