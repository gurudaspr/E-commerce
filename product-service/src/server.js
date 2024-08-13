import express from 'express';
import 'dotenv/config';



const app = express();
app.use(express.json());


app.use('/',(req,res)=>{
    res.send('product service running');
});
app.listen(process.env.PORT || 5001, () => {
    console.log(`Product service running on port ${process.env.PORT || 5001}`);
});


