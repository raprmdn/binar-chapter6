const express = require('express');
const UserGameHistoryController = require('../controllers/usergamehistory.controller');
const {authentication} = require("../middlewares/authentication.middleware");

const router = express.Router();

router.get('/', authentication, UserGameHistoryController.getAll);

module.exports = router;