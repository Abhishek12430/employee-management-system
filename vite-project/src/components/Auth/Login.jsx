import React, { useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';


function Login({handleLogin1}) {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    handleLogin1(email,password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
    <div className="login-page">
      <div className="login-form">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
      </div>
    </div>
    </>
  );
}

export default Login;
