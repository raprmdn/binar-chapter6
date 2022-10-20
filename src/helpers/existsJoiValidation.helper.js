const {UserGame, UserGameBiodata} = require('../models');
const Joi = require("joi");

const customThrowErrorJoiString = (msg, field) => {
    throw new Joi.ValidationError(msg,
        [
            {
                message: msg,
                path: [field],
                type: `string.${field}`,
                context: {
                    key: field,
                    label: field,
                    field,
                },
            },
        ],
        field
    );
}

module.exports = {
    isUsernameExists: async (username) => {
        const user = await UserGame.findOne({where: {username: username}});
        if (user) customThrowErrorJoiString("Username already exists", "username");

        return true;
    },
    isEmailExists: async (email) => {
        const user = await UserGame.findOne({where: {email: email}});
        if (user) customThrowErrorJoiString("Email already exists", "email");

        return true;
    },
    isNicknameExists: async (nickname, id) => {
        const character = await UserGameBiodata.findOne({where: {nickname: nickname}});
        if (character && character.id !== id) customThrowErrorJoiString("Nickname already exists", "nickname");

        return true;
    }
}