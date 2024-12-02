import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from './authSlice'; // Import the async login action
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email, password }));
  };

  // If user is logged in, redirect them to the home page
  useEffect(() => {
    if (user) {
      navigate('/');  // Redirect to home page if user is logged in
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 max-w-md mx-auto mt-24 p-6 rounded-lg shadow-lg sm:w-11/12 md:w-9/12 lg:w-6/12">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-gray-600 font-semibold">Login</h1>
        <p className="pt-8 w-full text-left">Email</p>
        <input
          className="w-full mt-2 bg-white h-10 rounded-lg px-4 border border-gray-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="pt-4 w-full text-left">Password</p>
        <input
          className="w-full mt-2 bg-white h-10 rounded-lg px-4 border border-gray-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-10 w-full bg-blue-500 text-white h-10 rounded-lg" disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="flex pt-5">
          <p className="text-gray-600">Don't have an account?</p>
          <NavLink to="/register">
            <p className="text-blue-600 ml-1 cursor-pointer">Register</p>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
