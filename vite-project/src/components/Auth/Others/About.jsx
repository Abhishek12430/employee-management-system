import React from 'react'

function About({data2}) {
  return (
    <div>
      <h3>empId:{data2.id}</h3>
      <h3>name:{data2.firstName}</h3>
      <h3>email:{data2.email}</h3>
    </div>
  )
}

export default About