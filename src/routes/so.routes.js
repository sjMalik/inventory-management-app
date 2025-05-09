const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

const { createSO, deleteSO, getSOById, getSOs, updateSO, updateSOStatus } = require('../controllers/so.controller');

router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'SALES_MANAGER']), // Only Admin and Purchasing Manager can create a SO
    createSO);
router.get('/', authMiddleware, getSOs);
router.get('/:id',
    authMiddleware,
    getSOById);
router.put('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'SALES_MANAGER']), // Only Admin and Purchasing Manager can update a SO
    updateSO);
router.delete('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN']), // Only Admin can delete a SO
    deleteSO);
router.patch('/:id/status',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'SALES_MANAGER']), // Only Admin and Purchasing Manager can update a SO status
    updateSOStatus);

module.exports = router;