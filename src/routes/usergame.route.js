const express = require('express');
const UserGameController = require('../controllers/usergame.controller');
const {
    loginValidation,
    registerValidation,
    changePasswordValidation
} = require("../utils/validation/usergame.validation");
const {authentication} = require("../middlewares/authentication.middleware");
const { response } = require("../utils/response.utils");

const router = express.Router();

router.post('/login', loginValidation, UserGameController.login);
router.post('/register', registerValidation, UserGameController.register);
router.get('/me', authentication, UserGameController.me);
router.patch('/change-password', authentication, changePasswordValidation, UserGameController.changePassword);
router.post('/logout', authentication, (req, res) => {
    return response(res, 200, true, "Logged out successfully");
});

module.exports = router;