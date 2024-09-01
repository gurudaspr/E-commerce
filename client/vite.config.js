import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for authentication
      '/api/v1/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
        // Proxy for user-related requests
      '/api/v1/user': {
        target: 'http://localhost:5001',
        rewrite: (path) => path.replace(/^\/api\/v1\/user/, '/user'),
      },
      // Proxy for products 
      '/api/v1/products': {
        target: 'http://localhost:5002',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/products/, '/products'),
      },
      '/api/v1/categories': {
        target: 'http://localhost:5002',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/categories/, '/categories'),
      },

      // Proxy for inventory
      '/api/v1/inventory': {
        target: 'http://localhost:5003',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/inventory/, '/inventory'),
      },

      // Proxy for cart-related requests
      '/api/v1/cart': {
        target: 'http://localhost:5004',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/cart/, '/cart'),
      },

    
      // Proxy for orders
      '/api/v1/orders': {
        target: 'http://localhost:5005',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/orders/, '/orders'),
      },

      // Proxy for payments
      '/api/v1/payments': {
        target: 'http://localhost:5005',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/payments/, '/payments'),
      },

      // Proxy for addresses
      '/api/v1/addresses': {
        target: 'http://localhost:5005',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/addresses/, '/addresses'),
      },
      // Proxy for coupons
      '/api/v1/coupons': {
        target: 'http://localhost:5006',  // Replace with the appropriate service URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/coupons/, '/coupons'),
      },
    },
  },
});
