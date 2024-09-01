import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios.js'

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/products');  // Fetch products from API
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, isLoading, error };
};

export default useFetchProducts;