

import React from 'react';
import axios from 'axios';
import '../../../App.css';

function AccceptTask({ data }) {
  const handleStatusChange = async (statusType) => {
    const updates = {
      newTask: false,
      active: false,
      completed: statusType === 'completed',
      failed: statusType === 'failed'
    };

    await axios.put(`http://localhost:5010/api/taskss/${data.id}`, updates);
    window.location.reload(); // or call a refetch function
  };

  return (
    <div className="Tasklist2">
      <div className='Tasklist21'>
        <h3 className='Tasklist211'>{data.category}</h3>
        <h4>{data.date}</h4>
      </div>
      <h2 className='Tasklist22'>{data.title}</h2>
      <p className='Tasklist23'>{data.description}</p>
      <div className='Tasklist24'>
        <button style={{ backgroundColor: "green" }} onClick={() => handleStatusChange('completed')}>
          MARK AS ACCEPTED
        </button>
        <button style={{ backgroundColor: "red" }} onClick={() => handleStatusChange('failed')}>
          MARK AS FAILED
        </button>
      </div>
    </div>
  );
}

export default AccceptTask;
