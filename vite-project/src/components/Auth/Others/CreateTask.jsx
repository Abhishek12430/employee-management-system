


// //---------------------------------------------

import React, { useState } from 'react';
import '../../../App.css';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Get employee ID by name
      const employeeRes = await fetch('http://localhost:5010/api/employees');
      const employees = await employeeRes.json();
      const employee = employees.find((emp) => emp.firstName === assignTo);

      if (!employee) {
        setStatusMessage('❌ Employee not found!');
        return;
      }

      const newTask = {
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        category: category,
        employee_id: employee.id,
        active: 1,
        newTask: 1,
        completed: 0,
        failed: 0
      };

      const res = await fetch('http://localhost:5010/api/taskss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage('✅ Task created successfully!');
        // Reset fields
        setTaskTitle('');
        setTaskDescription('');
        setTaskDate('');
        setAssignTo('');
        setCategory('');
      } else {
        setStatusMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setStatusMessage('❌ Failed to create task');
    }
  };

  return (
    <>
      <form className="task-form" onSubmit={submitHandler}>
        <div>
          <h3 className="form-label">Task Title</h3>
          <input
            type="text"
            className="form-input"
            placeholder="Make a UI design"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <h3 className="form-label">Date</h3>
          <input
            type="date"
            className="form-input"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
          />

          <h3 className="form-label">Assign to</h3>
          <input
            type="text"
            className="form-input"
            placeholder="Employee name"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            required
          />

          <h3 className="form-label">Category</h3>
          <input
            type="text"
            className="form-input"
            placeholder="Design, Dev, etc"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <h3 className="form-label">Description</h3>
          <textarea
            className="form-textarea"
            cols="30"
            rows="10"
            placeholder="Write task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          ></textarea>

          <button className="form-button" type="submit">
            Create Task
          </button>

          {statusMessage && <p style={{ marginTop: '10px' }}>{statusMessage}</p>}
        </div>
      </form>
    </>
  );
};

export default CreateTask;
