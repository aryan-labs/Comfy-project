import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../CartSlice';
import Header from '../../src/Header';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <Navbar />
      <h1 className="ml-4 sm:ml-20 text-2xl sm:text-3xl text-slate-700 font-medium mt-7">Shopping Cart</h1>
      <hr />
      <div className="flex justify-end pr-4 sm:pr-10">
        <button
          className="mt-3 text-lg sm:text-xl bg-blue-600 text-white rounded-lg w-28 sm:w-32"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
      <div className="flex flex-col sm:flex-row">
        {items.length > 0 ? (
          <div>
            <ul>
              {items.map((item) => (
                <div className="flex flex-col sm:flex-row ml-4 sm:ml-20 gap-4 sm:gap-10 items-center content-center mt-4" key={item.id}>
                  <img className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg" src={item.image} alt="" />
                  <li className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                      <h3 className="text-sm sm:text-lg text-gray-500">{item.company}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center content-center gap-4 sm:gap-10">
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ${item.totalPrice.toFixed(2)}</p>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
      <div>
        <div className="bg-slate-100 flex flex-col sm:w-80 h-auto sm:h-52 pt-10 pl-7 rounded-lg mt-10 sm:mt-6">
          <h2 className="text-sm sm:text-base">
            Total Items: <span className="ml-16 sm:ml-32">{totalQuantity}</span>
          </h2>
          <hr />
          <h2 className="text-sm sm:text-base">
            Total Price of products: <span className="ml-10 sm:ml-16">${totalPrice.toFixed(2)}</span>
          </h2>
          <hr />
          <h1 className="text-sm sm:text-base">
            Shipping price: <span className="ml-16 sm:ml-28">$5</span>
          </h1>
          <hr />
          <h1 className="text-lg sm:text-xl">
            Total Amount: <span className="ml-16 sm:ml-28">${(totalPrice + 5).toFixed(2)}</span>
          </h1>
        </div>
        <NavLink to="/checkout">
          <button className="bg-blue-600 w-full sm:w-72 h-10 ml-4 sm:ml-5 rounded-lg mt-4 text-white">
            PROCEED TO CHECKOUT
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
