const {UserGame} = require('../models');
const {response} = require("../utils/response.utils");

module.exports = {
    getAll: async (user) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) return response(404, false, 'User not found');

        return auth.getHistories({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }
}