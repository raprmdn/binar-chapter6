const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (user) => {
        const payload = { id: user.id, username:user.username, email: user.email };
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '15m'});
    }
}