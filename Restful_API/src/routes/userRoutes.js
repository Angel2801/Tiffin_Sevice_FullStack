const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
 
router.post('/', userController.registerUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;
