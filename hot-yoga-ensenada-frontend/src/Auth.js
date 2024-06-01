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
  const [regPasswordsMatch, setRegPasswordsMatch] = useState("");
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [verifyTokenAuth, setVerifyTokenAuth] = useState("");

  useEffect(() => {
    if (newPasswordOne && newPasswordOne === newPasswordTwo) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPasswordOne, newPasswordTwo]);

  useEffect(() => {
    if (regUserPassword && regUserPassword === regUserPasswordTwo) {
      setRegPasswordsMatch(true);
    } else {
      setRegPasswordsMatch(false);
    }
  }, [regUserPassword, regUserPasswordTwo]);

  useEffect(() => {
    if (location.state && location.state.authMode) {
      setAuthMode(location.state.authMode);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.verifyTokenAuth) {
      setVerifyTokenAuth(location.state.verifyTokenAuth);
    }
  }, [location.state]);

  const handleLogin = (event) => {
    event.preventDefault();
    setAuthMode('loading');

    fetch('http://localhost:9000/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (!response.ok) {
          setAuthMode('login')
          enqueueSnackbar("Hubo un problema al iniciar sesión, por favor verifica tu correo electrónico y contraseña.", {variant: 'error', autoHideDuration: 10000})
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
    setAuthMode('loading');
  
    fetch('http://localhost:9000/user/registeruser', {
      method: 'POST',
      body: JSON.stringify({ regUserName, regPhoneNumber, regUserEmail, regUserPassword }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (!response.ok) {
          setAuthMode('login');
          throw new Error('Registration failed.');
        }
        return response.json(); 
        // Parse the JSON from the response - this is VITAL for the DATA to be in JSON
        // in the next .then promise
      })
      .then((data) => {
        console.log(data);
        // I removed the "setUser" userContext method from here so that the user
        // is only set AFTER the email is verified.
        navigate('/verifytoken', { state: { verifyType: 'registerEmail', backendToken: data.token } });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Este email no está registrado.", {variant: 'error', autoHideDuration: 10000});
      });
  };

  const handleForgot = (event) => {
    event.preventDefault();
    setAuthMode('loading');
    fetch('http://localhost:9000/user/forgot', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'forgotPassEmail': forgotEmail
      }
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'Este email no está registrado.');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('data response in handleForgot', data);
        navigate('/verifytoken', { state: { verifyType: 'newPass', backendToken: data.user.token } });
      })
      .catch((error) => {
        console.error('Error verificando código.', error);
        enqueueSnackbar("Este email no está registrado.", {variant: 'error', autoHideDuration: 10000})
        setAuthMode('login');
      });
  };
  

  const handleNewPassword = (event) => {
    event.preventDefault();
    setAuthMode('loading');
    setVerifyTokenAuth(verifyTokenAuth)
    console.log("front end verifytoken", verifyTokenAuth)
    fetch('http://localhost:9000/user/changepass', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'verifytoken': verifyTokenAuth,
        'newpasswordone': newPasswordOne
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === 'success') {
          setUser(data.user)
          navigate('/home');
        } else {
          console.log(data)
        }
      })
      .catch((error) => {
        console.error('Error changing new password:', error)
      }); 
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
                autoComplete="username"
                value={username}
                required
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
                required
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
                autoComplete="username"
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
                autoComplete="new-password"
                value={regUserPassword}
                onChange={(event) => { setRegUserPassword(event.target.value); }}
              />
            </div>
            <div className="form-group mt-1">
              <label>contraseña otra vez</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="confirm password"
                autoComplete="new-password"
                value={regUserPasswordTwo}
                onChange={(event) => { setRegUserPasswordTwo(event.target.value); }}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-4">
              <button type="submit" className="btn btn-warning" disabled={!regPasswordsMatch}>
                submit
              </button>
              {regUserPassword && regUserPasswordTwo && regUserPassword.length <= regUserPasswordTwo.length && regUserPassword !== regUserPasswordTwo && (
                <div className="mt-2 mx-auto text-danger">
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
            <div className="d-grid gap-2 mt-1">
            </div>
            <h5 className="auth-form-hye">hot yoga ensenada</h5>
            <div className='mx-auto'>
              <h5 className="auth-form-urgent">crea una nueva contraseña e ingrésala dos veces</h5>
            </div>
            <div className="form-group mt-3">
              <label>primera vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="new-password"
                value={newPasswordOne}
                onChange={(event) => { setNewPasswordOne(event.target.value) }}
              />
            </div>
            <div className="form-group mt-3">
              <label>segunda vez</label>
              <input
                type="password"
                className="form-control mt-1"
                autoComplete="new-password"
                value={newPasswordTwo}
                onChange={(event) => { setNewPasswordTwo(event.target.value) }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning" disabled={!passwordsMatch}>
                Submit
              </button>
              {newPasswordOne && newPasswordTwo && newPasswordOne.length <= newPasswordTwo.length && newPasswordOne !== newPasswordTwo && (
                <div className="mt-2 mx-auto text-danger">
                  Las contraseñas no coinciden--omaiga
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "loading") {
    return (
      <div className="auth-form-container auth-loading">
        <div className="auth-form-content">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading...</h5>
        </div>
      </div>
    );
  }

};