import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connection URI
const uri ='mongodb://localhost:27017/project';
if (!uri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connection is established');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};
