import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`);
      setProducts(response.data.data.attributes);
      console.log(response.data.data.attributes);
    };
    FetchData();
  }, [id]);

  // Function to handle increment
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

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
            <img className="w-96 h-96 rounded-lg" src={products.image} alt={products.title} />
          </div>
          <div className='flex flex-col pl-10 gap-5'>
            <h1 className='text-3xl font-bold text-gray-700'>{products.title}</h1>
            <h1 className='text-xl font-bold text-gray-400'>{products.company}</h1>
            <h1 className='text-xl'>Price: ${products.price / 100}</h1>
            <h1 className='text-xl font-bold'>Total: ${(products.price * quantity / 100).toFixed(2)}</h1>
            <h1 className='text-gray-600 max-w-xl'>{products.description}</h1>
            <div className="flex items-center gap-4">
              <button
                className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold"
                onClick={handleIncrement}
              >
                +
              </button>
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
