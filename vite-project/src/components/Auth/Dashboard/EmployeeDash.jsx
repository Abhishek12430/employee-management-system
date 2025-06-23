
//-------------------------------------------------------------------------------------------------------


import React, { useEffect, useState } from 'react';
import Header from '../Others/Header';
import { TaskNumberList } from '../Others/TaskNumberList';
import TaskList from '../Tasklist/TaskList';
import '../../../App.css';
import About from '../Others/About';

export const EmployeeDash = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [about,setabout]= useState(false);

  const openNav = () => setIsSidebarOpen(true);
  const closeNav = () =>{ setIsSidebarOpen(false);
    if(about){setabout(false)}
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('http://localhost:5010/api/employees');
      const data = await res.json();
      setEmployees(data);
    };

    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5010/api/taskss');
      const data = await res.json();
      setTasks(data);
    };

    

    fetchEmployees();
    fetchTasks();
  }, []);

  const aboutcheck=()=>{setabout(prev=>!prev)}

  let combinedData;

  if (props.data) {
    // For individual employee dashboard
    const loggedInUser = props.data;
    const empTasks = tasks.filter(task => task.employee_id === loggedInUser.id);

    const taskStats = {
      newTask: empTasks.filter(t => t.newTask).length,
      active: empTasks.filter(t => t.active).length,
      completed: empTasks.filter(t => t.completed).length,
      failed: empTasks.filter(t => t.failed).length,
    };

    combinedData = {
      ...loggedInUser,
      tasks: empTasks,
      taskStats
    };
  } else {
    // Admin dashboard: All employees with their tasks
    combinedData = employees.map(emp => {
      const empTasks = tasks.filter(task => task.employee_id === emp.id);
      const taskStats = {
        newTask: empTasks.filter(t => t.newTask).length,
        active: empTasks.filter(t => t.active).length,
        completed: empTasks.filter(t => t.completed).length,
        failed: empTasks.filter(t => t.failed).length,
      };
      return {
        ...emp,
        tasks: empTasks,
        taskStats
      };
    });
  }

  let data1 = props.data;

  return (
    <div className='divEMPD'>
      {/* Sidebar */}
      <div id="myNav" className={`overlay ${isSidebarOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={closeNav}>&times;</button>
        <div className="overlay-content">
          <div onClick={aboutcheck}>
          <h3 style={{cursor:'pointer'}}>About</h3> 
           {about&&<div className='AboutE'><About data2={combinedData}/></div>}
            </div>
          <a href="#">Projects</a>
          <a href="#">Support</a>
          <a href="#">Contact</a>
        </div>
      </div>

      {isSidebarOpen && <div className="white-overlay" onClick={closeNav}></div>}

      <div className="mainContent">
      <div className="sideNheader">
        <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
            &#9776;
          </span>
        <Header changeUser={props.changeUser} data={combinedData} />
      </div>
        
          <TaskNumberList data={combinedData} />
          <TaskList data={combinedData} />
        
    </div>

    </div>
  );
};
