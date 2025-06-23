

//----------------------------------

import React, { useEffect, useState } from 'react';
import '../../../App.css';

function AllTask() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch employees
    const fetchEmployees = async () => {
      const res = await fetch('http://localhost:5010/api/employees');
      const data = await res.json();
      setEmployees(data);
    };

    // Fetch tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5010/api/taskss');
      const data = await res.json();
      setTasks(data);
    };

    fetchEmployees();
    fetchTasks();
  }, []);

  // Build stats per employee
  const getTaskStats = (empId) => {
    const empTasks = tasks.filter((task) => task.employee_id === empId);
    const stats = {
      newTask: 0,
      active: 0,
      completed: 0,
      failed: 0,
    };

    empTasks.forEach((task) => {
      if (task.newTask) stats.newTask++;
      if (task.active) stats.active++;
      if (task.completed) stats.completed++;
      if (task.failed) stats.failed++;
    });

    return stats;
  };

  return (
    <div className="AllTaskdiv">
      {employees.map((emp) => {
        const stats = getTaskStats(emp.id);

        return (
          <div key={emp.id} className="AllTaskdiv2">
            <h2>{emp.firstName}</h2>
            <h5 style={{ color: 'blue' }}>
              New Task: <span style={{ color: 'white' }}>{stats.newTask}</span>
            </h5>
            <h5 style={{ color: 'orange' }}>
              Active: <span style={{ color: 'white' }}>{stats.active}</span>
            </h5>
            <h5 style={{ color: 'green' }}>
              Completed: <span style={{ color: 'white' }}>{stats.completed}</span>
            </h5>
            <h5 style={{ color: 'red' }}>
              Failed: <span style={{ color: 'white' }}>{stats.failed}</span>
            </h5>
          </div>
        );
      })}
    </div>
  );
}

export default AllTask;
