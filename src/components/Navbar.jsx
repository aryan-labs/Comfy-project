import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Pages/authSlice'; // Ensure you have the logout action in your authSlice
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState(false); // Dark mode state
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Assuming auth state holds user data

  // Handle theme toggle
  const handleTheme = () => {
    setTheme(!theme);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user data from Redux
  };

  // Store theme preference in localStorage to persist on page reload
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme(true);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <div className="flex bg-slate-200 dark:bg-slate-800 pb-4 pt-3 items-center justify-between">
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
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>Home</h3>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>About</h3>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>Products</h3>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>Cart</h3>
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>Checkout</h3>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? 'active-class text-blue-500' : 'text-gray-800 dark:text-gray-400')}
        >
          <h3>Orders</h3>
        </NavLink>
      </div>

      {/* Icons */}
      <div onClick={handleTheme} className="flex mr-20 cursor-pointer">
        {theme ? (
          <FaMoon className="w-10 h-5 text-yellow-500" />
        ) : (
          <IoSunnyOutline className="w-10 h-5 text-yellow-500" />
        )}

        <NavLink to='/cart'>
          <FaShoppingCart className="w-10 h-5 ml-4 text-gray-800 dark:text-gray-400" />
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
