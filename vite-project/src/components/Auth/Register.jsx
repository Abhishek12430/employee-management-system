import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

try{

  const employeeRes = await fetch('http://localhost:5010/api/employees');
      const employees = await employeeRes.json();
      const employee = employees.find((emp) => emp.email === email);

      if (employee) {
        alert("this email already exist")
        return;
      }

    // Create user object to send
    const userData = {
      firstName: name,
      email: email,
      password: password,
    };

    console.log(userData)
  
      const res = await fetch('http://localhost:5010/api/employees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
});

      // const data = await res.json();

      if (res.ok) {
        alert('✅ Registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        alert(`❌ Error: `);
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="register-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
