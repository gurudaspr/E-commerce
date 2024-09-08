import { useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useProductStore } from '../store/useProductStore';

const useFetchProducts = () => {
  const { setProducts, setLoading, setError, applyFilters } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.products);
        applyFilters(); // Apply filters after fetching products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts, setLoading, setError, applyFilters]);
};

export default useFetchProducts;