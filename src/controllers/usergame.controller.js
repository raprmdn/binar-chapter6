const UserGameService = require('../services/usergame.service');
const {response} = require("../utils/response.utils");

module.exports = {
    register: async (req, res) => {
        try {
            await UserGameService.register(req.body);
            return response(res, 201, true, "User registered successfully");
        } catch (err) {
            return response(res, 500, false, err.message);
        }
    },
    login: async (req, res) => {
        try {
            const user = await UserGameService.login(req.body);
            return response(res, 200, true, "User logged in successfully", { user });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    me: async (req, res) => {
        try {
            const user = await UserGameService.me(req.user);
            return response(res, 200, true, "User retrieved successfully", { user });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    changePassword: async (req, res) => {
        try {
            await UserGameService.changePassword(req.user, req.body);
            return response(res, 200, true, "Password changed successfully");
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    }
};
