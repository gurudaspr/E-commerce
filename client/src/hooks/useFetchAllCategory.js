import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/categories');
        console.log(response.data.categories);
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export default useFetchCategories;