import React, { useState } from 'react';
import '../../../App.css';
import { FiLogOut, FiCalendar } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiBell,FiX } from "react-icons/fi";
import Notification from '../statusnotification/Notification';


function Header(props) {

  const [showCalendar, setShowCalendar] = useState(false);     // toggle calendar
  const [showNotification,setNotification] = useState(false);

console.log('there i am',props.data)
//-----------------------------logout----------------------------------------------
  const logOutUser = () => {
    localStorage.removeItem('logged');

    props.changeUser('');
  };
///------------------------------------------------------------------------------------
  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };
const openNot =()=>{
  
  if(showCalendar==true){
    setShowCalendar(false);
  }
  setNotification(true);}
const closeNot =()=>{setNotification(false);}
// ------------------------------------------------------------------------------------
let name = (props.data?.firstName || 'Admin');
  return (
    <>
    <div id="note" className={`note ${showNotification?`open`:``}`}>
      <div>
      <div className="contain">
             <h3>NOTIFICATION</h3>
      <span onClick={closeNot}><FiX size={20} className='closebtn'/></span>
      </div>
      <Notification name={name}/>
      </div>
    </div>
    <div className='header' style={{ position: 'relative' }}>
      <div className="left-header">
        <span className="greeting">
          Hello, <strong>{props.data?.firstName || 'Admin'} 👋</strong>
        </span>

        <span className='calenderH' onClick={toggleCalendar} style={{ cursor: 'pointer', position: 'relative' }}>
          <FiCalendar size={20} style={{ marginLeft: '15px', color: '#fff' }} />

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className='calender'>
              <Calendar/>
            </div>
          )}
        </span>
{/* ---------------------------------------------------------------------------------------------------------------- */}
        <span className='notification' onClick={openNot}style={{ cursor: 'pointer', position: 'relative' }}>
          <FiBell size={20} color="#fff" />
        </span>
        
      </div>
          {/* -------------------------------------------------------------------- */}
      <div className="right-header">
        <button className="logout-btn" onClick={logOutUser} title="Logout">
          <FiLogOut size={22} />
        </button>
      </div>
    </div>
    </>
  );
}

export default Header;
