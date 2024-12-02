// Checkout.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { totalPrice } = useSelector((state) => state.cart);

  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = () => {
    const newOrder = {
      firstName,
      address,
      totalPrice,
      date: new Date().toLocaleString(),
    };

    // Get existing orders from localStorage (if any)
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Add the new order to the list of orders
    existingOrders.push(newOrder);

    // Save all orders back to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Navigate to the orders page
    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600 text-sm font-medium mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-600 text-sm font-medium mb-2">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-gray-600 text-sm font-medium mb-2">
            Total Price
          </label>
          <input
            id="totalPrice"
            type="text"
            value={`$${totalPrice}`}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
