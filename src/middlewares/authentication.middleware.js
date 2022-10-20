const jwt = require('jsonwebtoken');
const {response} = require("../utils/response.utils");

module.exports = {
    authentication: (req, res, next) => {
        try {
            const bearer = req.headers.authorization;
            if (!bearer) return response(res, 401, false, "Unauthorized");

            const token = bearer.split(' ')[1];
            req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') return response(res, 401, false,
                "Unauthorized. Token Expired. Please login again.");
            if (err.name === 'JsonWebTokenError') return response(res, 401, false,
                "The provided token is invalid.");

            return response(res, 401, false, err.message);
        }
    }
};