import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';


const app = express();
app.use(express.json());


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/',(req,res)=>{
    res.send(' auth service running'  );
});
connectDB();
app.listen(process.env.PORT || 5001, () => {
    console.log(`Auth service running on port ${process.env.PORT || 5001}`);
});


