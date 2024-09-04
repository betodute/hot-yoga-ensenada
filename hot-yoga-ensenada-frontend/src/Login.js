import React from 'react';

export const Login = ({ username, password, setAuthMode, setUserEmail, setUserPassword, handleLogin }) => (
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
);
