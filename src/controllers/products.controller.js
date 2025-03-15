const Product = require('../models/products.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');
const redisClient = require('../../database/redis');

exports.getProducts = async (req, res) => {
    try {
        const { status, search, page, limit, sort_by, order } = req.query;

        // Cahce key
        const key = `products:${status}:${search}:${page}:${limit}:${sort_by}:${order}`;

        // Check if the key exists in the cache
        const cacheData = await redisClient.get(key);

        if (cacheData) {
            return successResponse(res, JSON.parse(cacheData), 'Products retrieved successfully', 200);
        }

        const products = await Product.getAll({ status, search, page: parseInt(page, 10), limit: parseInt(limit, 10), sort_by, order });

        // Save the data in the cache for 5 minutes
        await redisClient.set(key, JSON.stringify(products), 'EX', 300);

        return successResponse(res, products, 'Products retrieved successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

// Clear cache after product change
const clearCache = async (req, res, next) => {
    await redisClient.flushall();
}

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        // Clear cache
        await clearCache();
        return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.update(req.params.id, req.body);
        if (!product || product.length === 0) {
            return errorResponse(res, 'Product not found', 404);
        }
        // Clear cache
        await clearCache();
        return successResponse(res, product, 'Product updated successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product || product === 0) {
            return errorResponse(res, 'Product not found', 404);
        }
        // Clear cache
        await clearCache();
        return successResponse(res, null, 'Product deleted successfully', 200);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}