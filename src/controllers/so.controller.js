const SO = require('../models/so.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');

exports.getSOs = async (req, res) => {
    try {
        const data = await SO.getAll();

        return successResponse(res, data, 'SOs retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error retrieving SOs', 500);
    }
}

exports.getSOById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await SO.getById(id);

        if (!data) {
            return errorResponse(res, 'SO not found', 404);
        }

        return successResponse(res, data, 'SO retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error retrieving SO', 500);
    }
}

exports.createSO = async (req, res) => {
    const { buyer_id, currency_id, notes, terms, status, sales_items } = req.body;

    try {
        const user_id = req.user?.id;

        // Prepare data for the sales order
        const soData = {
            buyer_id,
            currency_id,
            notes,
            terms,
            status: status || 'PENDING',
            created_by: user_id,
        };

        // Prepare line items
        const line_items = sales_items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            rate: item.rate,
            unit_id: item.unit_id,
            amount: item.quantity * item.rate,
        }));

        // calculate the total amount for the sales order
        const total_amount = line_items.reduce((acc, item) => acc + item.amount, 0);
        soData.total = total_amount;

        // Call the model's create method
        const result = await SO.create({ ...soData, line_items });

        return successResponse(res, result, 'Sales order created successfully', 201);
    } catch (error) {
        return errorResponse(res, 'Error creating sales order', 500);
    }
}

exports.updateSO = async (req, res) => {
    const { id } = req.params;
    const { buyer_id, currency_id, notes, terms, status, sales_items } = req.body;

    try {
        // Prepare data for the sales order
        const soData = {
            buyer_id,
            currency_id,
            notes,
            terms,
            status: status || 'PENDING',
        };

        // Prepare line items
        const line_items = sales_items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            rate: item.rate,
            unit_id: item.unit_id,
            amount: item.quantity * item.rate,
        }));

        // calculate the total amount for the sales order
        const total_amount = line_items.reduce((acc, item) => acc + item.amount, 0);
        soData.total = total_amount;

        // Call the model's update method
        const result = await SO.update(id, { ...soData, line_items });

        if (!result) {
            return errorResponse(res, 'Sales order not found', 404);
        }

        return successResponse(res, result[0], 'Sales order updated successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message ? error.message : 'Error updating sales order', error.status ? error.status : 500);
    }
}

exports.updateSOStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const data = await SO.updateStatus(id, status);

        if (!data) {
            return errorResponse(res, 'Sales order not found', 404);
        }

        return successResponse(res, data[0], 'Sales order status updated successfully', 200);
    } catch (error) {
        return errorResponse(res, 'Error updating sales order status', 500);
    }
}

exports.deleteSO = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await SO.delete(id);

        return successResponse(res, null, 'Sales order deleted successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message ? error.message : 'Error updating sales order', error.status ? error.status : 500);
    }
}
