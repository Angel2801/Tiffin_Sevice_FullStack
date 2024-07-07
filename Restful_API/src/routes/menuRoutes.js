const express = require('express');
const router = express.Router();
const menuController = require('../Controller/menuController');

router.post('/', menuController.createMenuItem);
router.get('/:provider', menuController.getMenuItemsByProvider);
router.patch('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
