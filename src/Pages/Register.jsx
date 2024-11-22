import React from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div>
         <div className="bg-gray-100 max-w-md mx-auto mt-24 p-6 rounded-lg shadow-lg">
  <form className="flex flex-col items-center">
    <h1 className="text-4xl text-gray-600 font-semibold">Register</h1>
     <p className="pt-8 w-full text-left">Name</p>
    <input
      className="w-full mt-2 bg-white h-10 rounded-lg px-4 border border-gray-300"
      type="text"
      name="name"
    />
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
      REGISTER
    </button>
    <button className="mt-6 w-full text-white bg-indigo-800 h-10 rounded-lg">
      GUEST USER
    </button>
    <div className="flex pt-5">
           <p className="text-gray-600">Already Have A Account?</p>
     <NavLink to='/login'> <p className="text-blue-600 ml-1 cursor-pointer">Login</p></NavLink>
    </div>
  </form>
</div>
    </div>
  )
}

export default Register
