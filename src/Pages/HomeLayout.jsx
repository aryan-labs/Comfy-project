import React from 'react'
import Header from '../Header'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HomeProduct from './HomeProduct'
const HomeLayout = () => {
  return (
    <div>

      <Header></Header>
     <Navbar/>
     <Hero/>
     <HomeProduct/>
    </div>
  )
}

export default HomeLayout
