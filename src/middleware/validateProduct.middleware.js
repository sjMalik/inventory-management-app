const Joi = require('joi');
const { errorResponse } = require('../helpers/response.helper');

const baseProductSchema = {
    name: Joi.string().min(3),
    price: Joi.number().precision(2).positive(),
    description: Joi.string().allow(null, ''),
    stock_quantity: Joi.number().integer().positive().min(0),
    status: Joi.string().valid('ACTIVE', 'INACTIVE')
};

const createProductSchema = Joi.object({
    ...baseProductSchema,
    name: baseProductSchema.name.required(),
    price: baseProductSchema.price.required(),
    stock_quantity: baseProductSchema.stock_quantity.required(),
    status: baseProductSchema.status.required()
});

// Update Product Schema (at least one field is required)
const updateProductSchema = Joi.object({
    ...baseProductSchema
}).min(1);

// Create middleware to validate create product request
module.exports.validateCreateProduct = (req, res, next) => {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next();
}

// Create middleware to validate update product request
module.exports.validateUpdateProduct = (req, res, next) => {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next();
}