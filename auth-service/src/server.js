import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';


const app = express();
app.use(express.json());


app.use('/auth',authRoutes);
app.use('/',(req,res)=>{
    res.send(' auth service');
});
console.log('auth service started');
connectDB();
app.listen(process.env.PORT || 5001, () => {
    console.log(`Auth service running on port ${process.env.PORT || 5001}`);
});


