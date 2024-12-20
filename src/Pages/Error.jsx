import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40 px-4 sm:px-8 md:px-16">
      <h1 className="text-6xl sm:text-9xl font-semibold text-pink-500">404</h1>
      <h3 className="text-2xl sm:text-4xl pt-5 font-bold text-gray-700">Page Not Found</h3>
      <p className="pt-4 text-lg sm:text-xl text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
      <NavLink to="/">
        <button className="mt-8 w-32 sm:w-36 h-10 rounded-lg text-lg bg-purple-500 text-black">
          Go Back Home
        </button>
      </NavLink>
    </div>
  )
}

export default Error
