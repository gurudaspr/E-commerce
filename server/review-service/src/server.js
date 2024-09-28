import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import reviewRoutes from './routes/review.routes.js';


const app = express();
app.use(express.json());

app.use('/reviews', reviewRoutes);
app.use('/',(req,res)=>{
    res.send('review service running');
});

connectDB();
app.listen(process.env.PORT || 5007, () => {
    console.log(`Product service running on port ${process.env.PORT || 5007}`);
});


