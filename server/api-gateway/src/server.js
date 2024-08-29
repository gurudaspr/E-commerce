import express from 'express';
import http from 'http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Utility function to handle proxying
const proxyRequest = (targetHost, targetPort, basePath) => {
  return (req, res) => {
    console.log('Received request for:', req.method, req.url);

    const options = {
      hostname: targetHost,
      port: targetPort,
      path: basePath + req.url,
      method: req.method,
      headers: req.headers
    };

    console.log('Proxying to:', `http://${options.hostname}:${options.port}${options.path}`);

    const proxyReq = http.request(options, (proxyRes) => {
      console.log('Received response from target server:', proxyRes.statusCode);
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (error) => {
      console.error('Proxy error:', error);
      res.status(500).send('Proxy Error');
    });

    req.pipe(proxyReq);
  };
};

// Routes
app.use('/api/v1/auth', proxyRequest('auth-service', 5001, '/api/v1/auth'));
app.use('/api/v1/products', proxyRequest('product-service', 5002, '/api/v1/products'));
app.use('/api/v1/inventory', proxyRequest('inventory-service', 5003, '/api/v1/inventory'));

// Root route
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
