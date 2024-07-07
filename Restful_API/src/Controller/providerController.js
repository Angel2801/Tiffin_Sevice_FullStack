const Provider = require('../models/provider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'abqwertyuioplkjhgfdsazxcvbnmkloi';

// Create a new provider
exports.createProvider = async (req, res) => {
    const { full_name, email, phone, business_address, user_name, password, cpassword } = req.body;

    // Validate input fields
    if (!full_name || !email || !phone || !business_address || !user_name || !password || !cpassword) {
        return res.status(400).send({ error: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).send({ error: "Logo is required" });
    }

    if (password !== cpassword) {
        return res.status(400).send({ error: "Passwords do not match" });
    }

    if (password.length < 8) {
        return res.status(400).send({ error: "Password must be at least 8 characters long" });
    }

    try {
        const logo = `assets/${req.file.filename}`;
        const provider = new Provider({ full_name,email,phone,business_address,user_name,password,logo });

        const createProvider = await provider.save();
        res.status(201).send(createProvider);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

// Get provider by ID
exports.getProviderById = async (req, res) => {
    try {
        const provider_data = await Provider.findById(req.params.id);
        if (!provider_data) {
            return res.status(404).json({ error: 'Provider not found' });
        }
        res.json(provider_data);
    } catch (e) {
        console.error('Error fetching provider:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete provider by ID
exports.deleteProvider = async (req, res) => {
    try {
        const delete_Provider = await Provider.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(delete_Provider);
    } catch (e) {
        res.status(500).send();
    }
};

// Update provider by ID
exports.updateProvider = async (req, res) => {
    try {
        const update_Provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(404).send(update_Provider);
    } catch (e) {
        res.status(400).send(e);
    }
};

// Provider login
exports.loginProvider=async (req, res) => {
    const {email,password} = req.body;

    try {
        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find provider by email
        const provider = await Provider.findOne({ email }); 

        // If provider not found
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, provider.password);

        // If passwords don't match
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: provider._id }, jwtSecret, { expiresIn: '1h' });

        // Optionally, set token in cookie
        res.cookie('token', token, { httpOnly: true });

        // Respond with success
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

