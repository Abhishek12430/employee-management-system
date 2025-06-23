
//----------------------------------------


import React from 'react';
import '../../../App.css';
import AccceptTask from './AccceptTask';
import CompeteTask from './CompeteTask';
import FailedTask from './FailedTask';
import NewTask from './NewTask';

const TaskList = ({ data }) => {
  // Determine the list of tasks based on whether data is a single object or an array
  let allTasks = [];

  if (Array.isArray(data)) {
    // Admin view: Combine all tasks from all employees
    data.forEach(emp => {
      if (Array.isArray(emp.tasks)) {
        allTasks = [...allTasks, ...emp.tasks];
      }
    });
  } else {
    // Employee view
    allTasks = data.tasks || [];
  }

  return (
    <div className="Tasklist">
      {allTasks.map((elem, idx) => {
        if (elem.active) return <AccceptTask key={idx} data={elem} />;
        if (elem.newTask) return <NewTask key={idx} data={elem} />;
        if (elem.completed) return <CompeteTask key={idx} data={elem} />;
        if (elem.failed) return <FailedTask key={idx} data={elem} />;
        return null;
      })}
    </div>
  );
};

export default TaskList;



