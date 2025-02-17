import React, { useEffect, useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = () => {
   
  return (
    
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <div className='fs-3 text-primary font-bold'>Admin</div>
        {/* <a class="navbar-brand brand-logo mr-5" href="index.html"><img src="images/logo.svg" class="mr-2" alt="logo"/></a> */}
        {/* <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo"/></a> */}
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
         
        <ul class="navbar-nav navbar-nav-right">
           
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <img src="images/faces/face28.jpg" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <Link class="dropdown-item" to={'/login'}>
                <i className='text-primary'><IoMdLogIn /></i>
                Login
              </Link>
              <Link class="dropdown-item" to={'/register'}>
                <i class="ti-power-off text-primary"></i>
                Register
              </Link>
            </div>
          </li>
          <li class="nav-item nav-settings d-none d-lg-flex">
            <a class="nav-link" href="#">
              <i class="icon-ellipsis"></i>
            </a>
          </li>
        </ul>
        {/* <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button> */}
      </div>
    </nav>
         
  )
}

export default Header
