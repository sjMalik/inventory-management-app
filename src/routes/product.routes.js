const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');
const validateProduct = require('../middleware/validateProduct.middleware');

const { createProduct, getProducts } = require('../controllers/products.controller');

router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']), // Only Admin and Purchasing Manager can create a product
    validateProduct,
    createProduct);
router.get('/', authMiddleware, getProducts);

module.exports = router;