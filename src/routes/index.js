const express = require('express');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const poRoutes = require('./po.routes');
const soRoutes = require('./so.routes');

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/products', productRoutes);
router.use('/purchase-orders', poRoutes);
router.use('/sales-orders', soRoutes);

module.exports = router;