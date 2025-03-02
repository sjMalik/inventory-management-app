const Product = require('../models/products.model');
const {successResponse, errorResponse} = require('../helpers/response.helper');

// Get all products with pagination, filter and sort
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = req.query.filter || {};
    const sort = req.query.sort || {};

    const products = await Product.findAll({filter, sort, skip, limit});

    return successResponse(res, products, 'Products retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return successResponse(res, product, 'Product created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}