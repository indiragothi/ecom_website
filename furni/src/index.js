import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Service from './pages/Service';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Thankyou from './pages/Thankyou';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './components/ProductDetails';
import AddToWishlist from './pages/AddToWishlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/about' element={<About/>}/> 
            <Route path='/service' element={<Service/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/thankyou' element={<Thankyou/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/product-details/:id' element={<ProductDetails/>}/>
            <Route path='/add-to-wishlist' element={<AddToWishlist/>}/>
          </Route>
        </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

