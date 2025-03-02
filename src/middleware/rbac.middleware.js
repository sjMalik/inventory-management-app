const logger = require('../helpers/logger');
const { errorResponse } = require('../helpers/response.helper');

const rbacMiddleware = (roles) => {
    return (req, res, next) => {
        logger.info(`Requested user: ${req.user.role}`);
        if (!roles.includes(req.user.role)) {
            return errorResponse(res, 'Unauthorized', 401);
        }

        next();
    }
}

module.exports = rbacMiddleware;