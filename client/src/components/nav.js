import React from 'react';
import { Link } from 'react-router-dom';
import {  Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Nav() {
  let user=useSelector(state=>state.user.name)
  return (
    <div className='navbox'>
      <div className="logo">@DEVCONNECT</div>
      <nav className='nav_box'>
        <Link to='/'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
        {user===undefined ?(<><Link to='/login'>LOGIN</Link><Link to='/signup'>SIGNUP</Link></>):(<><Link to='/chat'>CHAT</Link><Link to='/login'>{'@'+user}</Link></>)}
      </nav>
      <Outlet />
    </div>
  );
}
