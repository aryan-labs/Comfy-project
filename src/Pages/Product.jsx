import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]); // Original product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
  const [loading, setLoading] = useState(true);//for loading
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);//to search according to category
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    company: 'all',
    sort: 'a-z',
    price: 1000,
    freeShipping: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products');
        const products = response.data.data;
        setFetchedProducts(products); // Set original product list
        setFilteredProducts(products); // Initially show all products
        setTotal(response.data.meta.pagination.total);
        setCategories(response.data.meta.categories || []);
        setCompanies(response.data.meta.companies || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let updatedProducts = [...fetchedProducts];

    // Filter by Search
    if (filters.search) {
      updatedProducts = updatedProducts.filter((product) =>
    product.attributes.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by Category
    if (filters.category !== 'all') {
      updatedProducts = updatedProducts.filter(
        (product) => product.attributes.category === filters.category
      );
    }

    // Filter by Company
    if (filters.company !== 'all') {
      updatedProducts = updatedProducts.filter(
        (product) => product.attributes.company === filters.company
      );
    }

    // Filter by Price
    updatedProducts = updatedProducts.filter(
      (product) => product.attributes.price / 100 <= filters.price
    );

    // Filter by Free Shipping
    if (filters.freeShipping) {
      updatedProducts = updatedProducts.filter(
        (product) => product.attributes.freeShipping 
       
      );
    }

    // Sort the Products
    if (filters.sort === 'a-z') {
      updatedProducts.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
    } else if (filters.sort === 'z-a') {
      updatedProducts.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
    } else if (filters.sort === 'high') {
      updatedProducts.sort((a, b) => b.attributes.price - a.attributes.price);
    } else if (filters.sort === 'low') {
      updatedProducts.sort((a, b) => a.attributes.price - b.attributes.price);
    }

    setFilteredProducts(updatedProducts); // Update the filtered list
  }, [filters, fetchedProducts]);

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      company: 'all',
      sort: 'a-z',
      price: 1000,
      freeShipping: false,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Navbar />
      <div className='p-5 '>
        {/* Filters Section */}
        <div className='flex flex-wrap bg-slate-100 ml-12 max-w-6xl p-5 gap-7 rounded-lg shadow-md'>
          <div className='flex  gap-4'>
            {/* Search Product */}
            <div className='flex flex-col'>
              <h1 className='text-gray-600 font-semibold'>Search Product</h1>
              <input
                className='border border-gray-400 rounded-lg w-52 p-2'
                type='text'
                name='search'
                placeholder='Search here...'
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Select Category */}
            <div>
              <h1 className='text-gray-600 font-semibold'>Select Category</h1>
              <select
                className='border border-gray-400 rounded-lg w-52 p-2'
                name='category'
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value='all'>All</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Company */}
            <div>
              <h1 className='text-gray-600 font-semibold'>Select Company</h1>
              <select
                className='border border-gray-400 rounded-lg w-52 p-2'
                name='company'
                value={filters.company}
                onChange={(e) =>
                  setFilters({ ...filters, company: e.target.value })
                }
              >
                <option value='all'>All</option>
                {companies.map((com, index) => (
                  <option key={index} value={com}>
                    {com}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <h1 className='text-gray-600 font-semibold'>Sort By</h1>
              <select
                className='border border-gray-400 rounded-lg w-52 p-2'
                name='sort'
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
              >
                <option value='a-z'>a-z</option>
                <option value='z-a'>z-a</option>
                <option value='high'>Price: High to Low</option>
                <option value='low'>Price: Low to High</option>
              </select>
            </div>
          </div>
          {/* Price Slider and Free Shipping */}
          <div className='flex  gap-4'>
            {/* Price Range */}
            <div>
              <div className='flex justify-between'>
                <h1 className='text-gray-600 font-semibold'>Select Price</h1>
                <h1>${filters.price}</h1>
              </div>
              <input
                className='w-full'
                type='range'
                name='price'
                value={filters.price}
                max={1000}
                min={0}
                onChange={(e) =>
                  setFilters({ ...filters, price: e.target.value })
                }
              />
              <div className='flex justify-between text-gray-500'>
                <span>$0</span>
                <span>Max: $1000</span>
              </div>
            </div>

            {/* Free Shipping */}
            <div className='flex items-center gap-2'>
              <input
                className='h-5 w-5'
                type='checkbox'
                name='freeShipping'
                checked={filters.freeShipping}
                onChange={(e) =>
                  setFilters({ ...filters, freeShipping: e.target.checked })
                }
              />
              <h1 className='text-gray-600 font-semibold'>Free Shipping</h1>
            
          </div>

          {/* Submit and Reset Buttons */}
          <div className='flex  gap-4'>
            <button
              className='h-10 w-52 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              onClick={() => {}}
            >
              Search
            </button>
            <button
              className='h-10 w-52 bg-pink-600 text-white rounded-lg hover:bg-pink-700'
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          
</div>
        </div>

        {/* Product List Section */}
        <h1 className='mt-5 text-gray-700 text-lg'>{filteredProducts.length} Products</h1>
        <div className='grid grid-cols-3 gap-10 mt-5'>
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className='rounded-xl w-80 h-72 border shadow-2xl flex items-center flex-col'>
                <img
                  className='w-72 rounded-lg h-48'
                  src={product.attributes.image}
                  alt=''
                />
                <h2 className='text-xl text-gray-700 pt-4'>
                  {product.attributes.title}
                </h2>
                <p>${product.attributes.price / 100}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
