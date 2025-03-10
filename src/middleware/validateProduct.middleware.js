const Joi = require('joi');
const { errorResponse } = require('../helpers/response.helper');

const baseProductSchema = {
    name: Joi.string().min(3),
    price: Joi.number().precision(2).positive(),
    description: Joi.string().allow(null, ''),
    stock_quantity: Joi.number().integer().positive().min(0),
    status: Joi.string().valid('ACTIVE', 'INACTIVE')
};

// Create Product validation schema
const createProductSchema = Joi.object({
    name: baseProductSchema.name.required(),
    price: baseProductSchema.price.required(),
    description: baseProductSchema.description,
    stock_quantity: baseProductSchema.stock_quantity.required(),
    status: baseProductSchema.status.required()
});

// Update Product validation schema (at least one field is required)
const updateProductSchema = Joi.object(baseProductSchema).min(1);

// Middleware to validate create product request
const validateCreateProduct = (req, res, next) => {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next();
}

// Middleware to validate update product request
const validateUpdateProduct = (req, res, next) => {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next();
}

module.exports = { validateCreateProduct, validateUpdateProduct };