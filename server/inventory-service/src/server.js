import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import inventoryRoutes from './routes/inventory.routes.js';


const app = express();
app.use(express.json());


app.use('/api/v1/inventory',inventoryRoutes);


app.use('/',(req,res)=>{
    res.send('inventory service running'); 
});

connectDB();
app.listen(process.env.PORT || 5003, () => {
    console.log(`inventory service running on port ${process.env.PORT || 5003}`);
});


