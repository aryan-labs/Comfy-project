import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './Pages/authSlice.js';  // Import logout action
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action to clear user data
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">My Application</h1>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4">Hi, {user.name}</span>  {/* Display user name */}
            <button 
              onClick={handleLogout} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
