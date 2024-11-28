import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products');
        setProducts(response.data.data); // Assuming the products are in `data.data`
      console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once after the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Products</h1>
      <div>
      <div className='grid grid-cols-3 ml-24 items-center h-96'>
        {products.map((product) => (
          <Link to={`/products/${product.id}`}>
             <div className='rounded-xl w-80 h-72 border shadow-2xl flex items-center flex-col mt-10'  key={product.id}>
            <img className='w-72 rounded-lg h-48' src={product.attributes.image} alt=''/>
            <h2 className='text-xl text-gray-700 pt-4'>{product.attributes.title}</h2>
            <p>${product.attributes.price/100}</p>
          </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
