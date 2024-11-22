import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row-reverse pr-16 gap-4 bg-indigo-950 h-8 items-center  text-gray-300'>
    <NavLink to='/login'>  <p>Sign-in/Guest</p></NavLink>
     <NavLink to='/register'> <p>Create Acount</p></NavLink>
    </div>
  )
}

export default Header
