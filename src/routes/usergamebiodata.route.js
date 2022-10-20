const express = require('express');
const UserGameBiodataController = require('../controllers/usergamebiodata.controller');
const {
    createNewCharacterValidation,
    changeNicknameValidation,
    joinOrChangeGuild, joinOrChangeFamilyValidation, gainedExpValidation
} = require("../utils/validation/usergamebiodata.validation");
const {authentication} = require("../middlewares/authentication.middleware");

const router = express.Router();

router.get('/', authentication, UserGameBiodataController.getUserCharacters);
router.post('/', authentication, createNewCharacterValidation, UserGameBiodataController.createNewCharacter);

router.patch('/:nickname/change-nickname', authentication, changeNicknameValidation, UserGameBiodataController.changeNickname);

router.patch('/:nickname/join-guild', authentication, joinOrChangeGuild, UserGameBiodataController.joinGuild);
router.patch('/:nickname/change-guild', authentication, joinOrChangeGuild, UserGameBiodataController.changeGuild);
router.delete('/:nickname/leave-guild', authentication, UserGameBiodataController.leaveGuild);

router.patch('/:nickname/join-family', authentication, joinOrChangeFamilyValidation, UserGameBiodataController.joinFamily);
router.patch('/:nickname/change-family', authentication, joinOrChangeFamilyValidation, UserGameBiodataController.changeFamily);
router.delete('/:nickname/leave-family', authentication, UserGameBiodataController.leaveFamily);

router.patch('/:nickname/gained-exp', authentication, gainedExpValidation, UserGameBiodataController.gainedExp);
router.patch('/:nickname/level-up', authentication, UserGameBiodataController.levelUp);

router.delete('/:nickname/delete-character', authentication, UserGameBiodataController.deleteCharacter);

module.exports = router;