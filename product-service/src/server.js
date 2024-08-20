import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';



const app = express();
app.use(express.json());

app.use('/api/v1/products',productRoutes);

app.use('/',(req,res)=>{
    res.send('product service running');
});

connectDB();
app.listen(process.env.PORT || 5001, () => {
    console.log(`Product service running on port ${process.env.PORT || 5001}`);
});


