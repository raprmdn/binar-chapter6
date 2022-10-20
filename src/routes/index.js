const express = require('express');
const UserGameRouter = require('./usergame.route');
const UserGameBiodataRouter = require('./usergamebiodata.route');
const UserGameHistoryRouter = require('./usergamehistory.route');

const router = express.Router();

router.use('/auth', UserGameRouter);
router.use('/characters', UserGameBiodataRouter);
router.use('/histories', UserGameHistoryRouter);

module.exports = router;