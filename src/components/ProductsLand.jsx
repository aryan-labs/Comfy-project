import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductsLand = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products?featured=true');
        setProducts(response.data.data); // Assuming the products are in `data.data`
        console.log(response.data.data);
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
    <div className="flex flex-col mt-20 px-4 sm:px-8">
      <h1 className="text-3xl text-gray-700 font-medium mb-6">Featured Products</h1>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            className="rounded-xl w-full h-72 border shadow-2xl flex flex-col items-center"
            key={product.id}
          >
            <Link to={`/products/${product.id}`}>
              <img
                className="w-72 h-48 rounded-lg object-cover mb-4"
                src={product.attributes.image}
                alt={product.attributes.title}
              />
              <h2 className="text-xl text-gray-700">{product.attributes.title}</h2>
              <p className="text-gray-600">${(product.attributes.price / 100).toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLand;
