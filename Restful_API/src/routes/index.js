    const express = require('express');
    const router = express.Router();

    // Import route modules
    const userRoutes = require('./userRoutes');
    const providerRoutes = require('./providerRoutes');
    const menuRoutes = require('./menuRoutes');
    const orderRoutes = require('./orderRoutes');

    // Mount routes
    router.use('/user', userRoutes);
    router.use('/provider', providerRoutes);
    router.use('/menu', menuRoutes);
    router.use('/order', orderRoutes);

    module.exports = router;
