import mongoose from 'mongoose';
import 'dotenv/config';



 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')

    }
    catch (err) {
        console.log('Error connecting to MongoDB')
        console.log(err);

    }
}

export default connectDB;