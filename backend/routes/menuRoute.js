import express from 'express';
import {addImage, listFood,deleteMenuItem} from "../controllers/menuController.js"
import multer from "multer";

const menuRouter=express.Router();

//Image Storage Engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage});

menuRouter.post("/add",upload.single("image"), addImage);
menuRouter.get("/list",listFood);
menuRouter.post("/delete",deleteMenuItem);
export default menuRouter;