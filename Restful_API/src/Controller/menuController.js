const Menu = require('../models/menu');
const Provider = require('../models/provider');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
    const { provider, itemName, description, price, category, available } = req.body;

    try {
        // Validate that provider is provided
        if (!provider) {
            return res.status(400).json({ error: 'Provider is required' });
        }

        // Check if the provider exists
        const existingProvider = await Provider.findById(provider);
        if (!existingProvider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        const menu = new Menu({ provider, itemName, description, price, category, available });
        await menu.save();
        res.status(201).send(menu);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
};

// Get all menu items by provider ID
exports.getMenuItemsByProvider = async (req, res) => {
    const { provider } = req.params;

    try {
        const menus = await Menu.find({ provider: provider });
        res.send(menus);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const menu = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!menu) {
            return res.status(404).send('Menu item not found');
        }
        res.send(menu);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Invalid menu item ID');
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        // Attempt to find and delete the menu item by ID
        const menu = await Menu.findByIdAndDelete(id);

        // If menu item with specified ID does not exist
        if (!menu) {
            return res.status(404).send('Menu item not found');
        }

        // If menu item is successfully deleted
        res.send(menu);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};
