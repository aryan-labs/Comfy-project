import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [products, setProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`);
      setProducts(response.data.data.attributes);
      console.log(response.data.data.attributes);
    };
    FetchData();
  }, [id]);

  return (
    <div>
      <Header />
      <Navbar />
      <div className='flex text-gray-500 mt-12 ml-20'>
      <Link to='/'>Home</Link>
      <p>></p>
      <Link to='/products'>Products</Link>
      </div>
      {products ? (
        <div className="flex mt-10 ml-20">
          <div>
            <img className="w-96 h-96 rounded-lg " src={products.image} alt="" />
          </div>
          <div className='flex flex-col pl-10 gap-5'>
            <h1 className='text-3xl font-bold text-gray-700'>{products.title}</h1>
            <h1 className='text-xl font-bold text-gray-400'>{products.company}</h1>
            <h1 className='text-xl'>${products.price/100}</h1>
            <h1 className='text-gray-600 max-w-xl'>{products.description}</h1>
            <div>
              <h1 className='font-medium text-gray-700'>Amount</h1>
              <select className=' border w-80 h-12 rounded-lg border-blue-800'>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
             
            </div>
             <button className='w-32 h-10 rounded-xl bg-violet-800 text-white'>ADD TO BAG</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleProduct;
