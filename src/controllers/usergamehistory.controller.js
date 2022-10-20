const UserGameHistoryService = require('../services/usergamehistory.service');
const {response} = require("../utils/response.utils");

module.exports = {
    getAll: async (req, res) => {
        try {
            const histories = await UserGameHistoryService.getAll(req.user);
            return response(res, 200, true, 'Success get all histories', histories);
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    }
}