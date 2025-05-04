const PO = require('../models/po.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');

exports.getPOs = async (req, res) => {
    try {
        const data = await PO.getAll();

        return successResponse(res, data, 'POs retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error retrieving POs', 500);
    }
}

exports.getPOById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await PO.getById(id);

        if (!data) {
            return errorResponse(res, 'PO not found', 404);
        }

        return successResponse(res, data, 'PO retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error retrieving PO', 500);
    }
}

exports.createPO = async (req, res) => {
    const { product_id, supplier_id, quantity, status, price } = req.body;

    try {
        const user_id = req.user?.id;
        const data = await PO.create({ product_id, supplier_id, quantity, status, created_by: user_id, price });

        return successResponse(res, data[0], 'PO created successfully', 201);
    } catch (error) {
        return errorResponse(res, 'Error creating PO', 500);
    }
}

exports.updatePO = async (req, res) => {
    const { id } = req.params;
    const { product_id, supplier_id, quantity, status, price } = req.body;

    try {
        const data = await PO.update(id, { product_id, supplier_id, quantity, status, price });

        if (!data) {
            return errorResponse(res, 'PO not found', 404);
        }

        return successResponse(res, data[0], 'PO updated successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error updating PO', 500);
    }
}

exports.updatePOStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const data = await PO.updateStatus(id, status);

        if (!data) {
            return errorResponse(res, 'PO not found', 404);
        }

        return successResponse(res, data[0], 'PO status updated successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error updating PO status', 500);
    }
}

exports.deletePO = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await PO.delete(id);

        if (!data) {
            return errorResponse(res, 'PO not found', 404);
        }

        return successResponse(res, null, 'PO deleted successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error deleting PO', 500);
    }
}

