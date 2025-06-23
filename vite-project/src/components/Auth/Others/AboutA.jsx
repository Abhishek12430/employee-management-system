import React from 'react';

function AboutA({ data2 }) {
    console.log(data2);
  return (
    <div>
      {data2.length === 0 ? (
        <p>No admin data available.</p>
      ) : (
        data2.map((admin, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <h3>empId: {admin.id}</h3>
            <h3>Name: {admin.firstName}</h3>
            <h3>Email: {admin.email}</h3>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AboutA;
