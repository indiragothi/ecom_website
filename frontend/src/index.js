import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ViewProduct from './pages/viewProduct/ViewProduct';
import AddProduct from './components/modals/AddProduct';
import EditProduct from './components/modals/EditProduct';
import ViewMaster from './pages/master/ViewMaster';
import AddCategory from './components/modals/AddCategory';
import EditCategory from './components/modals/EditCategory';
import AddBrand from './components/modals/AddBrand';
import EditBrand from './components/modals/EditBrand';
import ViewUsers from './pages/viewUsers/ViewUsers';
 
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index path='/dashboard' element={<Dashboard/>} />
          <Route path='/product' element={<ViewProduct/>} />
          <Route path='/master' element={<ViewMaster/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/edit-product/:id' element={<EditProduct/>}/>
          <Route path='/add-category' element={<AddCategory/>} />
          <Route path='/edit-category/:id' element={<EditCategory/>} />
          <Route path='/add-brand' element={<AddBrand/>} />
          <Route path='/edit-brand/:id' element={<EditBrand/>} />
          <Route path='/all-users' element={<ViewUsers/>} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
 