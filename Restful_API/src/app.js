const express=require('express');
const app=express();
const router=require("./routes/index");
const cookieParser=require("cookie-parser");
const port = process.env.PORT || 3000;
const cors=require("cors");
app.use(express.json()); 
app.use(cors());
app.use(router);
app.use(cookieParser());
require("./db/conn");   

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});