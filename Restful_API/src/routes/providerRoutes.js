const express = require('express');
const router = express.Router();
const providerController = require('../Controller/providerController');

router.post('/', providerController.createProvider);
router.get('/:id', providerController.getProviderById);
router.delete('/:id', providerController.deleteProvider);
router.patch('/:id', providerController.updateProvider);
router.post('/login', providerController.loginProvider);

module.exports = router;
