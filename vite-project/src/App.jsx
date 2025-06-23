

//----------------------------------------------------------------------------------------------------------------------------------------------

    import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { EmployeeDash } from './components/Auth/Dashboard/EmployeeDash';
import AdminDash from './components/Auth/Dashboard/AdminDash';
import { AuthContext } from './context/AuthProvider';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const App =()=>{
const {employees,admin} = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);


  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
   const navigate = useNavigate();

useEffect(() => {
const logged = localStorage.getItem('logged');
 if (logged) {
 const userData = JSON.parse(logged);
setUser(userData.role);
setLoggedInUser(userData.data);
}
setIsLoading(false);
 }, []);

const handleLogin1 = (email, password) => {
if (email === 'admin@example.com' && password === '123') {
     setUser('admin');
localStorage.setItem('logged', JSON.stringify({ role: 'admin' ,data:admin }));
navigate('/admin');
} else if (employees) {
    const employee = employees.find(e => e.email === email && e.password === password);
    if (employee) {
setUser('employee');
      setLoggedInUser(employee);
localStorage.setItem('logged', JSON.stringify({ role: 'employee', data: employee }));
      navigate('/employee');
    } else {
      alert('Invalid details');
    }
  }
};

return (
   !isLoading && (
   <Routes>
     <Route path="/" element={<Login handleLogin1={handleLogin1} />} />
     <Route path="/register" element={<Register />} />
     <Route path="/admin" element={user === 'admin' ? <AdminDash changeUser={setUser}  data={loggedInUser} /> : <Navigate to="/" />} />
     <Route path="/employee" element={user === 'employee' ? <EmployeeDash changeUser={setUser} data={loggedInUser} /> : <Navigate to="/" />} /> 
     
   </Routes>
   )
 );

 
}

export default App;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
