import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
  return (
    <>
      <div id='left-navs'>
        <Link to='/'>
          <nav className='nav-item'>Snippet</nav>
        </Link>
      </div>
      <div id='right-navs'>
        <Link to='/register'>
          <nav className='nav-item'>Register</nav>
        </Link>
        <Link to='/login'>
          <nav className='nav-item'>Login</nav>
        </Link>
      </div>
    </>
  );
}