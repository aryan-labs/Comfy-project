import React from 'react';
import Header from '../Header';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-12 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <h1 className="font-semibold text-4xl sm:text-5xl text-gray-600">We Love </h1>
          <h1 className="font-semibold text-4xl sm:text-5xl bg-blue-500 text-white flex justify-center items-center w-32 sm:w-40 h-14 sm:h-16 pb-4 rounded-3xl">
            comfy
          </h1>
        </div>
        <p className="text-gray-600 max-w-full sm:max-w-2xl text-center sm:text-left mt-6 sm:mt-8 px-2 sm:px-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo labore, blanditiis eveniet quia saepe omnis asperiores molestias. 
          Obcaecati repudiandae reprehenderit voluptate nobis numquam praesentium sunt quia placeat, illo, officiis consequatur. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vitae molestias dolore illo sapiente rerum tempore corporis quae 
          laudantium, inventore sit ratione neque! Nulla pariatur cupiditate fugiat illum rerum veniam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro corporis saepe nisi omnis maxime, expedita maiores vero et vitae 
          praesentium numquam iste asperiores qui laudantium, culpa quos rem quam quas!
        </p>
      </div>
    </div>
  );
};

export default About;

