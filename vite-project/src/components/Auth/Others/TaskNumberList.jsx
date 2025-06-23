

import React from 'react';
import '../../../App.css';

export const TaskNumberList = ({ data }) => {
  let taskStats = {
    newTask: 0,
    completed: 0,
    active: 0,
    failed: 0,
  };

  // If array: admin view — sum stats
  if (Array.isArray(data)) {
    data.forEach(emp => {
      taskStats.newTask += emp.taskStats.newTask;
      taskStats.completed += emp.taskStats.completed;
      taskStats.active += emp.taskStats.active;
      taskStats.failed += emp.taskStats.failed;
    });
  } else {
    // Single user view
    taskStats = data.taskStats;
  }

  return (
    <>
      <div className="parent-container">
        <div className="task-item" style={{ backgroundColor: '#64748b' }}>
          <h2 className="task-number">{taskStats.newTask}</h2>
          <h3 className="task-title">New Task</h3>
        </div>

        <div className="task-item" style={{ backgroundColor: '#38bdf8' }}>
          <h2 className="task-number">{taskStats.completed}</h2>
          <h3 className="task-title">Completed Task</h3>
        </div>

        <div className="task-item" style={{ backgroundColor: '#4ade80' }}>
          <h2 className="task-number">{taskStats.active}</h2>
          <h3 className="task-title">Active Task</h3>
        </div>

        <div className="task-item" style={{ backgroundColor: '#f87171' }}>
          <h2 className="task-number">{taskStats.failed}</h2>
          <h3 className="task-title">Failed Task</h3>
        </div>
      </div>
    </>
  );
};

