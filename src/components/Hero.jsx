import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [theme, setTheme] = useState(false); // Dark mode state

  // Toggle theme
  const handleTheme = () => {
    setTheme(!theme);
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
    <div className={`mt-10 flex flex-col md:flex-row items-center content-center ml-5 md:ml-40 ${theme ? 'dark' : ''}`}>
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className={`text-4xl md:text-5xl font-bold ${theme ? 'text-gray-200' : 'text-gray-600'}`}>
          We are changing the way people shop
        </h1>
        <p className={`pt-6 text-lg md:text-xl ${theme ? 'text-gray-300' : 'text-gray-800'} max-w-xl mx-auto md:mx-0`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor obcaecati nulla, esse repellendus laboriosam nobis! 
          Adipisci, iure, minus numquam aliquid aspernatur vel quod consequatur atque, neque aut ullam corporis!
        </p>
        <Link to='/products'>
          <button className='mt-5 bg-blue-600 text-white w-36 h-10 rounded-md'>
            OUR PRODUCTS
          </button>
        </Link>
      </div>
      <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
        <img className='rounded-lg h-80 md:h-96 w-full md:w-3/12 object-cover' 
             src='https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp' 
             alt='' 
        />
      </div>
    </div>
  );
};

export default Hero;
