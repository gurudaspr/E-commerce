import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js';


const app = express();
app.use(express.json());


app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/addresses', addressRoutes);

app.use('/', (req, res) => {
    res.send('order service running');
});

connectDB();
app.listen(process.env.PORT || 5005, () => {
    console.log(`order service running on port ${process.env.PORT || 5005}`);
});


