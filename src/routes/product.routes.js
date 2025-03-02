const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/products.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');
const validateProduct = require('../middleware/validateProduct.middleware');

router.get('/', authMiddleware, getProducts); // Any authenticated user can access this route
router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']),
    validateProduct,
    createProduct
); // Only ADMIN and PURCHASING_MANAGER can access this route

module.exports = router;