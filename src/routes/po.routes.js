const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

const { createPO, getPOs, getPOById, updatePO, updatePOStatus, deletePO } = require('../controllers/po.controller');

// Create a new PO
router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']), // Only Admin and Purchasing Manager can create a PO
    createPO);

// Get all POs
router.get('/',
    authMiddleware,
    getPOs);

// Get a PO by ID
router.get('/:id',
    authMiddleware,
    getPOById);

// Update a PO
router.put('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER']), // Only Admin and Purchasing Manager can update a PO
    updatePO);

// Update PO status
router.patch('/:id/status',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'PURCHASING_MANAGER', 'SUPPLIER']), // Only Admin and Purchasing Manager can update PO status
    updatePOStatus);

// Delete a PO
router.delete('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN']), // Only Admin can delete a PO
    deletePO);


// Export the router
module.exports = router;