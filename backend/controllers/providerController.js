import Provider from '../models/providerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const jwtSecret = 'abqwertyuioplkjhgfdsazxcvbnmkloi';

// Create a new provider
export const createProvider = async (req, res) => {
    const { full_name, email, phone, business_address, password, cpassword } = req.body;

    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Validate input fields
    if (!full_name || !email || !phone || !business_address || !password || !cpassword) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Invalid Email' });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).send({ error: 'Password must be at least 8 characters long' });
    }

    try {
        const logo = `uploads/${req.file.filename}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const provider = new Provider({ full_name, email, phone, business_address, password: hashedPassword, cpassword: hashedPassword, logo });

        const createProvider = await provider.save();
        res.status(201).send(createProvider);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

// Get provider by ID
export const getProviderById = async (req, res) => {
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
export const deleteProvider = async (req, res) => {
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
export const updateProvider = async (req, res) => {
    try {
        const update_Provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!update_Provider) {
            return res.status(404).send('Provider not found');
        }
        res.send(update_Provider);
    } catch (e) {
        res.status(400).send(e);
    }
};

// Provider login
export const loginProvider = async (req, res) => {
    const { email, password } = req.body;

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
