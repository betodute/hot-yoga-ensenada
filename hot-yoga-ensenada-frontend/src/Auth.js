import React, { useState, useEffect } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './Auth.css';


export const Auth = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const [authMode, setAuthMode] = useState("login");
  const [verifyType, setVerifyType] = useState("");
  const [username, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [regUserName, setRegUserName] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regUserEmail, setRegUserEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [regUserPassword, setRegUserPassword] = useState("");
  const [regUserPasswordTwo, setRegUserPasswordTwo] = useState("");
  const [forgotToken, setForgotToken] = useState("");
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [verifyToken, setVerifyToken] = useState("")

  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (newPasswordOne && newPasswordOne === newPasswordTwo) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPasswordOne, newPasswordTwo]);

  useEffect(() => {
    if (location.state && location.state.authMode) {
      setAuthMode(location.state.authMode);
    }
  }, [location.state]);

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
    setSubmitClicked(true)

    if (regUserPassword !== regUserPasswordTwo) {
      enqueueSnackbar("Las contraseñas no coinciden--omaiga", { variant: 'error', autoHideDuration: 6000 })
      return;
    }

    fetch('http://localhost:9000/user/registeruser', {
      method: 'POST',
      body: JSON.stringify({ regUserName, regPhoneNumber, regUserEmail, regUserPassword }),
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
        // I removed the "setUser" userContext method from here so that the user
        // is only set AFTER the email is verified.
        navigate('/verifytoken', { state: { verifyType: 'registerEmail' } });
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
        'forgotPassEmail': forgotEmail
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data response in handleForgot', data);
        navigate('/verifytoken', { state: { verifyType: 'newPass' } });
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
        'forgotToken': forgotToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authMode) {
          enqueueSnackbar("Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.", { variant: 'default', autoHideDuration: 10000 })
          setAuthMode("signin")
          setForgotEmail("");
        }
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  };

  const handleVerifyToken = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/user/verifytoken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'verifytoken': verifyToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === 'success') {
          setUser(data.user)
          navigate('/home');
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
    console.log("hit handle new pass")
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
                onChange={(event) => { setUserEmail(event.target.value) }}
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
                onChange={(event) => { setUserPassword(event.target.value) }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning">
                submit
              </button>
            </div>
            <p className="text-center mt-3">
              <span className='link-primary' onClick={() => setAuthMode("forgot")}>Restablecer Contraseña</span>
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
            <div className="form-group mt-2">
              <label>nombre</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Marco Antonio Solis"
                value={regUserName}
                onChange={(event) => { setRegUserName(event.target.value) }}
              />
            </div>
            <div className="form-group mt-2">
              <label>teléfono</label>
              <input
                type="tel"
                className="form-control mt-1"
                placeholder="(646) 555-5555"
                value={regPhoneNumber}
                onChange={(event) => { setRegPhoneNumber(event.target.value) }}
              />
            </div>
            <div className="form-group mt-2">
              <label>correo electrónico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="email"
                value={regUserEmail}
                onChange={(event) => { setRegUserEmail(event.target.value) }}
              />
            </div>
            <div className="form-group mt-2">
              <label>contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="password"
                autoComplete="current-password"
                value={regUserPassword}
                onChange={(event) => { setRegUserPassword(event.target.value); setSubmitClicked(false) }}
              />
            </div>
            <div className="form-group mt-1">
              <label>contraseña otra vez</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="confirm password"
                autoComplete="current-password"
                value={regUserPasswordTwo}
                onChange={(event) => { setRegUserPasswordTwo(event.target.value); setSubmitClicked(false) }}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-4">
              <button type="submit" className="btn btn-warning">
                submit
              </button>
              {submitClicked && regUserPassword !== regUserPasswordTwo && (
                <div className="mt-2 text-danger">
                  Las contraseñas no coinciden--omaiga
                </div>
              )}
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
                onChange={(event) => { setForgotEmail(event.target.value) }}
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

  if (authMode === "renderNewPassword") {
    return (
      <div className="auth-form-container">
        <form onSubmit={handleNewPassword} className="auth-form">
          <div className="auth-form-content">
            <div className="d-grid gap-2 mt-3">
            </div>
            <h5 className="verify-hye">hot yoga ensenada</h5>
            <h5 className="auth-form-title-newpass">nueva contraseña dos veces</h5>
            <div className="form-group mt-3">
              <label>primera vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="current-password"
                value={newPasswordOne}
                onChange={(event) => { setNewPasswordOne(event.target.value) }}
              />
            </div>
            <div className="form-group mt-3">
              <label>segunda vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="current-password"
                value={newPasswordTwo}
                onChange={(event) => { setNewPasswordTwo(event.target.value) }}
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