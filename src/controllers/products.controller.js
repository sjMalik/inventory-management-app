const Product = require('../models/products.model');
const {successResponse, errorResponse} = require('../helpers/response.helper');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
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