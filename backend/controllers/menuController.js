import Menu from "../models/menuModel.js";
import fs from 'fs';
import Provider from "../models/providerModel.js";

// Create a new menu item
export const addImage = async (req, res) => {
    try {
        console.log('File uploaded:', req.file);
        console.log('Request body:', req.body);

        const image_filename = `${req.file.filename}`;
        const food = new Menu({
            provider: req.body.provider,
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            available: req.body.available,
            image: image_filename
        });

        // Validate that provider is provided
        if (!food.provider) {
            console.log('Provider is missing');
            return res.status(400).json({ success: false, message: 'Provider is required' });
        }

        // Check if the provider exists
        const existingProvider = await Provider.findById(food.provider);
        if (!existingProvider) {
            console.log('Provider not found');
            return res.status(404).json({ success: false, message: 'Provider not found' });
        }

        await food.save();
        res.json({ success: true, message: "Item Added" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ success: false, message: "Error occurred", error: error.message });
    }
};

// List Menu
export const listFood = async (req, res) => {
    try {
        const foods = await Menu.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
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
export const deleteMenuItem = async (req, res) => {
    try {
        const menu = await Menu.findById(req.body.id);
        
        // If menu item with specified ID does not exist
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }

        // Delete the image file if it exists
        fs.unlink(`uploads/${menu.image}`, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });

        // Delete the menu item from the database
        await Menu.findByIdAndDelete(req.body.id);

        // If menu item is successfully deleted
        res.json({ success: true, message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
