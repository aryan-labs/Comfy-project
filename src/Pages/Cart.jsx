// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../CartSlice';
import Header from '../../src/Header';
import Navbar from '../components/Navbar'
const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <h1 className='ml-20 text-3xl text-slate-700 font-medium mt-7 '>Shopping Cart</h1>
      <hr ></hr>
      <div className='flex flex-row-reverse pr-10 '> 
             <button className=' mt-3 text-xl bg-blue-600 text-white rounded-lg w-32'  onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
   <div className='flex'>
      {items.length > 0 ? (
        <div>
          
          <ul>
            {items.map((item) => (
              <div className='flex ml-20 gap-10 items-center content-center mt-4'>
              <img className='w-32 h-32 rounded-lg' src={item.image} alt=''/>
              <li className='flex gap-10' key={item.id}>
                <div>
              <h3 className='text-xl font-semibold'>{item.title}</h3>
               <h3 className='text-xl text-gray-500'>{item.company}</h3>
               </div> 
               <div className='flex items-center content-center gap-10 '>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.totalPrice.toFixed(2)}</p>
                <button   className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
              </li>
              <hr></hr>
              </div>
            
            ))}
          </ul>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
      <div>
      <div className=' bg-slate-100  flex-col w-80 h-52 pt-10 pl-7 rounded-lg mt-10'>
      <h2>Total Items:<span className='ml-32'> {totalQuantity}</span></h2>
     <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>

          <h2>Total Price of products:<span className='ml-10'> ${totalPrice.toFixed(2)}</span></h2>
           <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
          <h1>Shipping price:<span className='ml-28'>$5</span></h1>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <br></br>
          <h1 >Total Amount:<span className='ml-28'>${totalPrice.toFixed(2)+5}</span></h1>

          </div>
                     <button className='bg-blue-600 w-72 h-10 ml-5 rounded-lg mt-4 text-white '>PROCEED TO CHECKOUT</button>
         </div>
          </div>
    </div>
  );
};

export default Cart;

