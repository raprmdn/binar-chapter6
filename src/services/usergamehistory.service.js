const { UserGame } = require('../models');

module.exports = {
    getAll: async (user) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) throw { status: 404, message: 'User not found' };

        return auth.getHistories({
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }
}
