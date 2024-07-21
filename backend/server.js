import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js'
import menuRouter from './routes/menuRoute.js';
import providerRouter from './routes/providerRoute.js'
import userRouter from './routes/userRoute.js';

//App Config
const app=express();
const port=4000;

//middleware
app.use(express.json());
app.use(cors())

connectDB();
//Api endpoints
app.use("/api/menu",menuRouter);
app.use("/api/provider", providerRouter);  
app.use("/api/user",userRouter);
app.use("/images",express.static('uploads')); 
app.get("/",(req,resp)=>{
   resp.send("API Working")
})
 
app.get("/", (req, res) => {
   res.send("API Working");
});

// Global Error Handler
app.use((err, req, res, next) => {
   console.error("Error Details:", err);
   res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

app.get('/check-env', (req, res) => {
   res.json({ JWT_SECRET: process.env.JWT_SECRET });
});

app.listen(port, () => {
   console.log(`App running on port ${port}`);
});