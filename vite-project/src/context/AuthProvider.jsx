

//-----------------------------------------------------------------------------------------------------------------------------

import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5010/api/employees');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    const fetchAdmins = async () => {
      try {
        const res = await fetch('http://localhost:5010/api/admins');
        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        console.error('Error fetching admins:', err);
      }
    };

    fetchEmployees();
    fetchAdmins();
  }, []);

  return (
    <AuthContext.Provider value={{ employees, admins }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
