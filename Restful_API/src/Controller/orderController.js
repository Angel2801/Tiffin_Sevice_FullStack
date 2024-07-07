const Order = require('../models/order');
const User = require('../models/user');
const Provider = require('../models/provider');
const Menu = require('../models/menu');

// Create a new order
exports.createOrder = async (req, res) => {
    const { user, provider, menuItems } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if provider exists
        const existingProvider = await Provider.findById(provider);
        if (!existingProvider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        // Calculate total price based on menu items selected
        let totalPrice = 0;
        for (const item of menuItems) {
            const menu = await Menu.findById(item.menu);
            if (!menu) {
                return res.status(404).json({ error: `Menu item not found with ID ${item.menu}` });
            }
            totalPrice += menu.price * item.quantity;
        }

        const order = new Order({user,provider,menuItems,totalPrice });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ error: 'Failed to create order' });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    const {id} = req.params;

    try {
        // Find the order by ID and populate the user, provider, and menuItems details
        const order = await Order.findById(id); 

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateOrderById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const order = await Order.findByIdAndUpdate(id, updates, { new: true });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(400).json({ error: 'Failed to update order' });
    }
};

// Delete order by ID
exports.deleteOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = exports;
