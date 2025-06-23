
import React from 'react';
import axios from 'axios';
import '../../../App.css';

function FailedTask({ data }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5010/api/taskss/${data.id}`);
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
      <div className="Tasklist24" style={{ alignItems: "center", justifyContent: "center" }}>
        <button style={{ backgroundColor: "lightcoral", padding: "6px" }} onClick={handleDelete}>
          FAILED TASK
        </button>
      </div>
    </div>
  );
}

export default FailedTask;
