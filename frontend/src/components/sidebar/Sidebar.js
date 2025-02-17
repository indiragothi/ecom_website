import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { GiRingmaster } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <nav class="sidebar sidebar-offcanvas sidebar-contain" id="sidebar">
        <ul class="nav">
          
          <li class="nav-item">
            <Link class="nav-link" to='/dashboard' >
              <i class="menu-icon"><RxDashboard className='icon-size'/></i>
              <span class="menu-title">Dashboard</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link" to='/product' >
              <i class="menu-icon"><FaProductHunt className='icon-size'/></i>
              <span class="menu-title">Product</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link" to='/master' >
              <i class="menu-icon "><GiRingmaster className='icon-size'/></i>
              <span class="menu-title">Master</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link" to='/all-users' >
              <i class="menu-icon "><FaUsers className='icon-size'/></i>
              <span class="menu-title">All Users</span>
            </Link>
          </li>
           
        </ul>
        </nav>
      
    </>
  )
}

export default Sidebar
