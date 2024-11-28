import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductsLand = () => {
         const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
 const {id}=useParams()
    
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products?featured=true');
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
    
     <div className='flex flex-col mt-20 ml-20'>
      
      <h1 className='text-3xl text-gray-700 font-medium'>Featured Products</h1>
      <br></br>
      <hr></hr>
      <br></br>
      <div className='flex gap-14 h-96'>
        {products.map((product) => (

          <div className='rounded-xl w-80 h-72 border shadow-2xl flex items-center flex-col'  key={product.id}>
             <Link to={`/products/${product.id}`}>
            
            <img className='w-72 rounded-lg h-48' src={product.attributes.image} alt=''/>
            <h2 className='text-xl text-gray-700 pt-4'>{product.attributes.title}</h2>
            <p>${product.attributes.price/100}</p></Link>
          </div>
        ))}
      </div>
    </div>
   
  )
}

export default ProductsLand
