import React from 'react'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './Pages/HomeLayout'
import Product from './Pages/Product'
import SingleProduct from './Pages/SingleProduct'
import Login from './Pages/Login'
import Register from './Pages/Register'
import About from './Pages/About'
import Error from './Pages/Error'
import Navbar from './components/Navbar'
import Cart from './Pages/Cart'
import CheckOut from './Pages/CheckOut'
import Order from './Pages/Order'

const App = () => {
  return (
    <div>
      
      <Routes> 
        <Route errorElement={<Error/>} path='/' element={<HomeLayout/>}/>
        <Route errorElement={<Error/>} path='/products/:id' element={<SingleProduct/>}/>
        <Route errorElement={<Error/>} path='/products' element={<Product/>}/>
        <Route errorElement={<Error/>} path='/cart' element={<Cart/>}/>
        <Route errorElement={<Error/>} path='/login' element={<Login/>}/>
        <Route errorElement={<Error/>} path='/register' element={<Register/>}/>
        <Route errorElement={<Error/>} path='/about' element={<About/>}/>
        <Route errorElement={<Error/>} path='/checkout' element={<CheckOut/>}/>
        <Route errorElement={<Error/>} path='/orders' element={<Order/>}/>
        <Route errorElement={<Error/>} path='*' element={<Error/>}/>
        
      </Routes>
   
    </div>
  )
}

export default App
