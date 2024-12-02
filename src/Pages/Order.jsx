import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Retrieve all orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Total Price</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{order.firstName}</td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">${order.totalPrice}</td>
                  <td className="px-4 py-2 border">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NavLink to='/'>
        <button className='w-32 h-9 rounded-xl bg-blue-600 text-white mt-6'>Return To Home</button>
      </NavLink>
    </div>
  );
};

export default Orders;
