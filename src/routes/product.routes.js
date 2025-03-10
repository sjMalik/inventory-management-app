const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validateProduct.middleware');

const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/products.controller');

router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']), // Only Admin and Purchasing Manager can create a product
    validateCreateProduct,
    createProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']), // Only Admin and Purchasing Manager can update a product
    validateUpdateProduct,
    updateProduct);
router.delete('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN']), // Only Admin can delete a product
    deleteProduct);

module.exports = router;