// const express = require('express');
// const router = express.Router();
// const providerController = require('../Controller/providerController');
// const userController = require('../Controller/userController');
// const menuController = require('../Controller/menuController');
// const orderController=require('../Controller/orderController');

// // Routes for Provider
// router.post("/provider", providerController.createProvider);
// router.post("/Providerlogin", providerController.loginProvider);
// router.get("/provider/:id", providerController.getProviderById);
// router.delete("/provider/:id", providerController.deleteProvider);
// router.patch("/provider/:id", providerController.updateProvider);

// // Routes for User
// router.post("/user", userController.registerUser);
// router.post("/Userlogin", userController.loginUser);
// router.get("/user", userController.getAllUsers);
// router.get("/user/:id", userController.getUserById);
// router.delete("/user/:id", userController.deleteUser);
// router.patch("/user/:id", userController.updateUser);
// module.exports = router;

// //Routes for Menu
// router.post('/menu', menuController.createMenuItem);
// router.get('/menu/:provider', menuController.getMenuItemsByProvider);
// router.patch('/menu/:id', menuController.updateMenuItem);
// router.delete('/menu/:id', menuController.deleteMenuItem);

// //Routes for Order
// router.post('/order',orderController.createOrder);
// router.get('/order/:id',orderController.getOrderById);
// router.patch('/order/:id', orderController.updateOrderById);
// router.delete('/order/:id', orderController.deleteOrderById);



// const express=require("express");
// const router=new express.Router();
// const Provider=require("../models/provider")
// const bcrypt=require("bcryptjs");
// const jwt=require("jsonwebtoken");
// const jwtSecret = 'abhbhbhfbfbfbfbfbfbfbfbfbnmkhjg';
// const Menu = require('../models/menu');
// const Order = require('../models/order');
// const User = require('../models/user'); // Adjust path based on your file structure

// //PROVIDER REGISTRATION

// router.post("/provider", async (req, res) => {
//     const {full_name,email,phone,business_address,user_name,password,cpassword} = req.body;

//     // Validate password and confirm password
//     if (!password || !cpassword || !full_name || !email || !phone || !business_address || !user_name) {
//         return res.status(400).send({ error: "All fields are required" });
//     }

//     if (password !== cpassword) {
//         return res.status(400).send({ error: "Passwords do not match" });
//     }

//     if (password.length < 8) {
//         return res.status(400).send({ error: "Password must be at least 8 characters long" });
//     }

//     try {
//         const provider = new Provider({full_name,email,phone,business_address,user_name,password,cpassword });
//         const createprovider = await provider.save();
//         res.status(201).send(createprovider);
//     } catch (e) {
//         console.log(e);
//         res.status(400).send(e);
//         console.log(e);
//     }
// });

// router.get("/provider/:id", async (req, res) => {
//     try {
//         const provider_data = await Provider.findById(req.params.id);
//         if (!provider_data) {
//             return res.status(404).json({ error: 'Provider not found' });
//         }
//         res.json(provider_data);
//     } catch (e) {
//         console.error('Error fetching provider:', e);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.delete("/provider/:id",async(req,res)=>{
//     try{
//         const delete_Provider = await Provider.findByIdAndDelete(req.params.id);    
//         if(!req.params.id){
//             return res.status(400).send();
//         }
//         res.send(delete_Provider);
//     }catch(e){
//         res.status(500).send();
//     }
// });

// router.patch("/provider/:id",async(req,resp)=>{
//     try{
//         const Update_Provider = await Provider.findByIdAndUpdate(req.params.id,req.body,{ new: true});
//         resp.status(404).send(Update_Provider);
//     }catch(e){
//         resp.status(400).send(e);
//     }
// });

// //PROVIDER LOGIN   

// router.post('/Providerlogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Validate request body
//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and password are required' });
//         }

//         // Find provider by email
//         const provider = await Provider.findOne({ email }); 

//         // If provider not found
//         if (!provider) {
//             return res.status(404).json({ error: 'Provider not found' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, provider.password);

//         // If passwords don't match
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: provider._id }, jwtSecret, { expiresIn: '1h' });

//         // Optionally, set token in cookie
//         res.cookie('token', token, { httpOnly: true });

//         // Respond with success
//         res.status(200).json({ message: 'Login successful', token });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// //MENU

// router.post('/menu', async (req, res) => {
//     const { provider, itemName, description, price, category, available } = req.body;

//     try {
//         // Validate that provider is provided
//         if (!provider) {
//             return res.status(400).json({ error: 'Provider is required' });
//         }

//         // Check if the provider exists
//         const existingProvider = await Provider.findById(provider);
//         if (!existingProvider) {
//             return res.status(404).json({ error: 'Provider not found' });
//         }

//         const menu = new Menu({ provider, itemName, description, price, category, available });
//         await menu.save();
//         res.status(201).send(menu);
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error);
//     }
// });

// // Get all menu items by provider ID
// router.get('/menu/:provider', async (req, res) => {
//     const { provider } = req.params;

//     try {
//         const menus = await Menu.find({ provider: provider });
//         res.send(menus);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Update a menu item
// router.patch('/menu/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const menu = await Menu.findByIdAndUpdate(id, req.body, { new: true });
//         if (!menu) {
//             return res.status(404).send('Menu item not found');
//         }
//         res.send(menu);
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send('Invalid menu item ID');
//     }
// });

// // Delete a menu item
// router.delete('/menu/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Attempt to find and delete the menu item by ID
//         const menu = await Menu.findByIdAndDelete(id);

//         // If menu item with specified ID does not exist
//         if (!menu) {
//             return res.status(404).send('Menu item not found');
//         }

//         // If menu item is successfully deleted
//         res.send(menu);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

// //USER

// router.post("/user", async (req, res) => {
//     const { password, confirm_password, ...rest } = req.body;

//     // Validate password and confirm password
//     if (!password || !confirm_password) {
//         return res.status(400).send({ error: "Password and confirm password fields are required" });
//     }

//     if (typeof password !== 'string' || typeof confirm_password !== 'string') {
//         return res.status(400).send({ error: "Password and confirm password must be strings" });
//     }

//     if (password !== confirm_password) {
//         return res.status(400).send({ error: "Passwords do not match" });
//     }

//     if (password.length < 8) {
//         return res.status(400).send({ error: "Password must be at least 8 characters long" });
//     }

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with hashed password
//         const user = new User({ ...rest, password: hashedPassword });

//         // Save user to the database
//         const createUser = await user.save();

//         console.log("User created:", createUser); // Log the created user object

//         res.status(201).send(createUser); // Send the created user object as response
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(400).send({ error: error.message }); // Send the error message as response
//     }
// });
// //User

// router.get("/user",async(req,res)=>{
//     try{
//         const user_data=await User.find();
//         res.send(user_data);
//     }catch(e){
//         res.send(e);
//     }
// });

// router.get("/user/:id",async(req,res)=>{
//     try{
//         const _id=req.params.id;
//         const user_data= await User.findById(_id);
//         if(!user_data){
//             return res.status(400).send();
//         }
//         else{
//             res.send(user_data);
//         }
//     }catch(e){
//         res.status(500).send(e);
//     }
// });

// router.delete("/user/:id",async(req,res)=>{
//     try{
//         const delete_User = await User.findByIdAndDelete(req.params.id);    
//         if(!req.params.id){
//             return res.status(400).send();
//         }
//         res.send(delete_User);
//     }catch(e){
//         res.status(500).send();
//     }
// });

// router.patch("/user/:id",async(req,resp)=>{
//     try{
//         const Update_User = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true});
//         resp.status(404).send(Update_User);
//     }catch(e){
//         resp.status(400).send(e);
//     }
// });


// //ORDER
// router.post('/order', async (req, res) => {
//     const { user, provider, menuItems } = req.body;

//     try {
//         // Check if provider exists
//         const existingProvider = await Provider.findById(provider);
//         if (!existingProvider) {
//             return res.status(404).json({ error: 'Provider not found' });
//         }

//         // Calculate total price based on menu items selected
//         let totalPrice = 0;
//         for (const item of menuItems) {
//             const menu = await Menu.findById(item.menu);
//             if (!menu) {
//                 return res.status(404).json({ error: `Menu item not found with ID ${item.menu}` });
//             }
//             totalPrice += menu.price * item.quantity;
//         }

//         const order = new Order({ user, provider, menuItems, totalPrice });
//         const savedOrder = await order.save();
//         res.status(201).json(savedOrder);
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(400).json({ error: 'Failed to create order' });
//     }
// });

// //Get Order
// router.get('/order/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Find the order by ID and populate the user, provider, and menuItems details
//         const order = await Order.findById(id)
//             .populate('user', 'full_name email phone delivery_address')  // Adjust as needed to get user details
//             .populate('provider', 'full_name business_address')  // Adjust as needed to get provider details
//             .populate('menuItems.menu', 'itemName price');  // Populate menu items with item name and price

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// //USER LOGIN   

// router.post('/Userlogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Validate request body
//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and password are required' });
//         }

//         // Find provider by email
//         const user = await User.findOne({ email }); 

//         // If provider not found
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);

//         // If passwords don't match
//         // if (!isMatch) {
//         //     return res.status(400).json({ error: 'Invalid credentials' });
//         // }

//         // // Generate JWT token
//         const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

//         // // Optionally, set token in cookie
//         res.cookie('token', token, { httpOnly: true });

//         // Respond with success
//         res.status(200).json({ message: 'Login successful',token});

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// module.exports = router;