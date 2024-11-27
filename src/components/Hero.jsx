import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='mt-10 flex items-center content-center ml-40'>
        <div>
            <h1 className='text-5xl max-w-96 font-bold text-gray-600'>We are changing the way people shop</h1>
            <p className='pt-6 text-xl text-gray-800 max-w-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor obcaecati nulla, esse repellendus laboriosam nobis! Adipisci, iure, minus numquam aliquid aspernatur vel quod consequatur atque, neque aut ullam corporis!</p>
         <Link  to='/products'><button className='mt-5 bg-blue-600 text-white w-36 h-10 rounded-md'>OUR PRODUCTS</button></Link>
        </div>
      <img className='rounded-lg  h-96 w-3/12' src='https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp' alt=''/>
    </div>
  )
}

export default Hero
