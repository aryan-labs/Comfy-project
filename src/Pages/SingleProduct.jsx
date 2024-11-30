// src/pages/SingleProduct.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { addItem } from '../CartSlice';

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`);
      setProduct(response.data.data.attributes);
    };
    fetchData();
  }, [id]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          id,
          title: product.title,
          price: product.price / 100,
          image:product.image,
          company:product.company,
          quantity,
        })
      );
      alert(`${product.title} added to cart!`);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="flex text-gray-500 mt-12 ml-20">
        <Link to="/">Home</Link>
        <p>></p>
        <Link to="/products">Products</Link>
      </div>
      {product ? (
        <div className="flex mt-10 ml-20">
          <div>
            <img className="w-96 h-96 rounded-lg" src={product.image} alt={product.title} />
          </div>
          <div className="flex flex-col pl-10 gap-5">
            <h1 className="text-3xl font-bold text-gray-700">{product.title}</h1>
            <h1 className="text-xl font-bold text-gray-400">{product.company}</h1>
            <h1 className="text-xl">Price: ${product.price / 100}</h1>
            <h1 className="text-xl font-bold">Total: ${(product.price * quantity / 100).toFixed(2)}</h1>
            <h1 className="text-gray-600 max-w-xl">{product.description}</h1>
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
            <button
              className="w-32 h-10 rounded-xl bg-violet-800 text-white"
              onClick={handleAddToCart}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleProduct;
