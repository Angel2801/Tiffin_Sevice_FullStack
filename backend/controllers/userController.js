import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, resp) => {
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return resp.json({success:false,message:"User Does Not Exist "})
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return resp.json({success:false,message:"Invalid credentials"});
        }
        const token=createToken(user._id);
        resp.json({success:true,token})
    }catch(error){
        console.log(error);
        resp.json({success:false,message:"Error"}); 
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, resp) => {
    let { name, password, email, phone } = req.body;

    phone = String(phone);

    try {
        // Check if a user with the provided email or phone already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return resp.status(400).json({ success: false, message: "User with this email or phone already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return resp.status(400).json({ success: false, message: "Invalid email address" });
        }

        // Validate password strength
        if (password.length < 8) {
            return resp.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Validate phone number format and length
        if (!validator.isMobilePhone(phone, "any", { strictMode: false }) || phone.length < 10) {
            return resp.status(400).json({ success: false, message: "Invalid phone number. It must be at least 10 digits long." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new userModel({ name, email, password: hashedPassword, phone });
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);

        // Return success response with token
        resp.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration Error:", error);

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return resp.status(400).json({ success: false, message: `Duplicate key error: ${field} already exists` });
        } else if (error.name === 'ValidationError') {
            return resp.status(400).json({ success: false, message: "Validation Error" });
        } else {
            return resp.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    }
};

export { loginUser, registerUser };
