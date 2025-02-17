import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar';


function App() {
  return (
    <>
      <div className='container-scroller'>
        <Header/>
          <div className='container-fluid page-body-wrapper'>
            <Sidebar/>
              <div className='main-panel'>
                <Outlet/>
                <Footer/>
              </div>
          </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App;
