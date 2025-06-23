import React from 'react'
import '../../../App.css';
function NewTask({data}) {
  return (
    <div className="Tasklist2" >
        <div className='Tasklist21'>
          <h3 className='Tasklist211'>{data.category}</h3>
          <h4>{data.date}</h4>
        </div>
        <h2 className='Tasklist22'>{data.title}</h2>
        <p className='Tasklist23'>
         {data.description}
        </p>
         <div className="Tasklist24" style={{alignItems:"center",justifyContent:"center"}}>
        <button style={{backgroundColor:"lightpink", padding:"6px"}}>
         ACCEPT TASK
           </button>
           </div>
      </div>
  )
}

export default NewTask