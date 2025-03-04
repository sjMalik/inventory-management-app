const { errorResponse } = require('../helpers/response.helper');
const logger = require('../helpers/logger');

const rbacMiddleware = (roles) => {
    return (req, res, next) => {
        logger.info(`Requested user roles: ${req.user.role}`);
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return errorResponse(res, 'You do not have permission to access this resource', 403);
        }
    };
};

module.exports = rbacMiddleware;