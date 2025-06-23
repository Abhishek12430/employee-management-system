import React, { useState ,useEffect} from 'react';
import '../../../App.css';
import Header from '../Others/Header';
import CreateTask from '../Others/CreateTask';
import AllTask from '../Others/AllTask';
import AboutA from '../Others/AboutA';

function AdminDash(props) {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const[Employee,setEmployee] = useState([]);
   const [about,setabout]= useState(false);
  

  const openNav = () => setIsSidebarOpen(true);
  const closeNav = () =>{ setIsSidebarOpen(false);
    if(about){setabout(false)}
  }
   const aboutcheck=()=>{setabout(prev=>!prev)}

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5010/api/admins');
        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="Admindash">
      {/* Sidebar */}
      <div id="myNav" className={`overlay ${isSidebarOpen ? 'open' : ''}`}>
        <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <div className="overlay-content">
           <div onClick={aboutcheck}>
          <h3 style={{cursor:'pointer'}}>About</h3> 
           {about&&<div className='AboutE'><AboutA data2={Employee}/></div>}
            </div>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
      </div>

      {/* Optional transparent blur overlay */}
      {isSidebarOpen && <div className="white-overlay" onClick={closeNav}></div>}

      <div className="mainContent">
        <div className="sideNheader">
          <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
            &#9776;
          </span>
          <Header changeUser={props.changeUser} />
        </div>

        {/* Only show these when sidebar is closed */}
            <CreateTask />
            <AllTask />
        
      </div>
    </div>
  );
}

export default AdminDash;



