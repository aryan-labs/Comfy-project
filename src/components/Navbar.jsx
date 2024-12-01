import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Pages/authSlice'; // Ensure you have the logout action in your authSlice
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Assuming auth state holds user data

  const handleTheme = () => {
    setTheme(!theme);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user data from Redux
  };

  return (
    <div className="flex bg-slate-200 pb-4 pt-3 items-center justify-between">
      {/* Logo */}
      <NavLink to='/'>
        <img
          className="w-12 h-13"
          src="https://png.pngtree.com/png-clipart/20220531/original/pngtree-letter-c-logo-png-png-image_7784347.png"
          alt="Logo"
        />
      </NavLink>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>Home</h3>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>About</h3>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>Products</h3>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>Cart</h3>
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>Checkout</h3>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? 'active-class' : '')}
        >
          <h3>Orders</h3>
        </NavLink>
      </div>

      {/* Icons */}
      <div onClick={handleTheme} className="flex mr-20">
        {theme ? (
          <FaMoon className="w-10 h-5" />
        ) : (
          <IoSunnyOutline className="w-10 h-5" />
        )}

        <NavLink to='/cart'>
          <FaShoppingCart className="w-10 h-5" />
        </NavLink>

        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 text-red-500"
            title="Logout"
          >
            <FaSignOutAlt className="w-10 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
