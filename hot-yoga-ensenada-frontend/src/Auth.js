import React, { useState, useEffect } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './Auth.css';


export const Auth = () => {
  
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const [authMode, setAuthMode] = useState("login");
  const [username, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [regUserName, setRegUserName] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regUserEmail, setRegUserEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [regUserPassword, setRegUserPassword] = useState("");
  const [forgotToken, setForgotToken] = useState("")
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    // Check if passwords match whenever newPasswordOne or newPasswordTwo changes
    if (newPasswordOne && newPasswordOne === newPasswordTwo) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPasswordOne, newPasswordTwo]);

  const handleLogin = (event) => {
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
      navigate('/verifymessage');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const handleForgot = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/forgot', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'forgotPassEmail' : forgotEmail 
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.authMode) {
        enqueueSnackbar("Código de seguridad confirmado, omaiga.", {variant: 'default', autoHideDuration: 10000})
        setAuthMode("verifyForgotToken")
        setForgotToken("");
      }
    })
    .catch((error) => {
      console.error('Error verificando código.', error);
    });
  };

  const handleForgotToken = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/forgotToken', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'forgotToken' : forgotToken 
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.authMode) {
        enqueueSnackbar("Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.", {variant: 'default', autoHideDuration: 10000})
        setAuthMode("signin")
        setForgotEmail("");
      }
    })
    .catch((error) => {
      console.error('Error fetching reservations:', error);
    });
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
    console.log("{hit handle new pass")
  }

  if (authMode === "login") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleLogin} className="auth-form">
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
              <label>correo electrónico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="email"
                value={username}
                onChange={(event) => {setUserEmail(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {setUserPassword(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning">
                submit
              </button>
            </div>
            <p className="text-center mt-3">
              <span className='link-primary' onClick={() => setAuthMode("forgot")}>restablecer contraseña</span>
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
              <span className="link-primary" onClick={() => setAuthMode("login")}>
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
              <label>correo electrónico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="email"
                value={regUserEmail}
                onChange={(event) => {setRegUserEmail(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="password"
                autoComplete="current-password"
                value={regUserPassword}
                onChange={(event) => {setRegUserPassword(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-4">
              <button type="submit" className="btn btn-warning">
                submit
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
        <form onSubmit={handleForgot} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h4 className="auth-form-title">Restablecer Contraseña</h4>
            <div className="form-group mt-3">
              <label>correo electrónico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="email"
                value={forgotEmail}
                onChange={(event) => {setForgotEmail(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning">
                submit
              </button>
            </div>
            <div className=" mt-3 text-center">
            Back to {" "}
              <span className="link-primary" onClick={() => setAuthMode("login")}>
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "verifyForgotToken") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleForgotToken} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h4 className="auth-form-title"> ingresa el código enviado a tu email </h4>
            <div className="form-group mt-3">
              <input
                type="input"
                className="form-control mt-1"
                autoComplete="current-password"
                placeholder='código'
                value={newPasswordOne}
                onChange={(event) => {setForgotToken(event.target.value)}}
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

  if (authMode === "renderNewPassword") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleNewPassword} className="auth-form">
          <div className="auth-form-content">
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <h4 className="auth-form-title-newpass">nueva contraseña dos veces, please</h4>
            <div className="form-group mt-3">
              <label>primera vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="current-password"
                value={newPasswordOne}
                onChange={(event) => {setNewPasswordOne(event.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>segunda vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="current-password"
                value={newPasswordTwo}
                onChange={(event) => {setNewPasswordTwo(event.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning" disabled={!passwordsMatch}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

};