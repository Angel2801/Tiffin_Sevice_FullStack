const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'abqwertyuioplkjhgfdsazxcvbnmkloi';

// User registration
exports.registerUser = async (req, res) => {
    const {full_name,email,phone,delivery_address,user_name,password,confirm_password,date} = req.body;

    // Validate input fields
    if (!password || !confirm_password || !full_name || !email || !phone || !delivery_address || !user_name) {
        return res.status(400).send({ error: "All fields are required" });
    }

    if (password !== confirm_password) {
        return res.status(400).send({ error: "Passwords do not match" });
    }

    if (password.length < 8) {
        return res.status(400).send({ error: "Password must be at least 8 characters long" });
    }

    try {
        const user = new User({full_name,email,phone,delivery_address,user_name,password,confirm_password,date});
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find provider by email
        const user = await User.findOne({ email }); 

        // If provider not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        // Optionally, set token in cookie
        res.cookie('token', token, { httpOnly: true });

        // Respond with success
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const user_data = await User.find();
        res.send(user_data);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user_data = await User.findById(req.params.id);
        if (!user_data) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user_data);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const delete_User = await User.findByIdAndDelete(req.params.id);
        if (!delete_User) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(delete_User);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const Update_User = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Update_User) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(Update_User);
    } catch (e) {
        res.status(400).json({ error: 'Bad Request' });
    }
};
