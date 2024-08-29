import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cartRoutes from './routes/cart.routes.js';


const app = express();
app.use(express.json());


app.use('/api/v1/cart',cartRoutes);

app.use('/',(req,res)=>{
    res.send('cart service running');
});

connectDB();
app.listen(process.env.PORT || 5004, () => {
    console.log(`cart service running on port ${process.env.PORT || 5001}`);
});


