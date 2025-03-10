const Product = require('../models/products.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');

exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search, sort_by, order } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const products = await Product.getAll({ status, search, page: pageNumber, limit: limitNumber, sort_by, order });
        return successResponse(res, products, 'Products retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.update(id, req.body);
        if (!product || product.length < 1) return errorResponse(res, 'Product not found', 404);
        return successResponse(res, product, 'Product updated successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.delete(id);
        if (!product) return errorResponse(res, 'Product not found', 404);
        return successResponse(res, null, 'Product deleted successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}