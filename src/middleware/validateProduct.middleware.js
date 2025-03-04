const Joi = require('joi');
const { errorResponse } = require('../helpers/response.helper');

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().precision(2).positive().required(),
    description: Joi.string().allow(null, ''),
    stock_quantity: Joi.number().integer().positive().min(0).required(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required()
});

module.exports = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next();
}