import { useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useProductStore } from '../store/useProductStore'

const useFetchProducts = () => {
  const { setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts, setLoading, setError]);
};

export default useFetchProducts;