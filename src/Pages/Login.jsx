import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
   <div className="bg-gray-100 max-w-md mx-auto mt-24 p-6 rounded-lg shadow-lg">
  <form className="flex flex-col items-center">
    <h1 className="text-4xl text-gray-600 font-semibold">Login</h1>
    <p className="pt-8 w-full text-left">Email</p>
    <input
      className="w-full mt-2 bg-white h-10 rounded-lg px-4 border border-gray-300"
      type="email"
      name="email"
    />
    <p className="pt-4 w-full text-left">Password</p>
    <input
      className="w-full mt-2 bg-white h-10 rounded-lg px-4 border border-gray-300"
      type="password"
      name="password"
    />
    <button className="mt-10 w-full bg-blue-500 text-white h-10 rounded-lg">
      LOGIN
    </button>
    <div className="flex pt-5">
      <p className="text-gray-600">Not a Member Yet?</p>
     <NavLink to='/register'> <p className="text-blue-600 ml-1 cursor-pointer">Register</p></NavLink>
    </div>
  </form>
</div>

  )
}

export default Login
