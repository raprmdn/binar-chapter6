const Joi = require('joi');
const {responseValidationError} = require("../response.utils");
const existsJoiValidation = require('../../helpers/existsJoiValidation.helper');

const options = {
    errors: {
        wrap: {
            label: ''
        }
    },
    abortEarly: false
};

module.exports = {
    createNewCharacterValidation: async (req, res, next) => {
        const schema = Joi.object({
            nickname: Joi.string().alphanum().max(30).required()
                .external(async (value) => {
                    return await existsJoiValidation.isNicknameExists(value);
                }).label("Nickname"),
            race: Joi.string().valid("Human", "Elf", "Majin").required().label("Race"),
            type: Joi.string().valid("Fighter", "Rogue", "Mage").required().label("Class Type"),
            gender: Joi.string().valid("Male", "Female").required().label("Gender"),
            avatar: Joi.string().allow(null, '').label("Avatar")
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (err) {
            return responseValidationError(res, err);
        }
    },
    changeNicknameValidation: async (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required().label("Character ID"),
            nickname: Joi.string().alphanum().max(30).required()
                .external(async (value) => {
                    return await existsJoiValidation.isNicknameExists(value, req.body.id);
                }).label("Nickname")
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (err) {
            return responseValidationError(res, err);
        }
    },
    joinOrChangeGuild: async (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required().label("Character ID"),
            guild: Joi.string().required().label("Guild")
        });

        const {error} = schema.validate(req.body, options);
        if (error) return responseValidationError(res, error);

        next();
    },
    joinOrChangeFamilyValidation: async (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required().label("Character ID"),
            family: Joi.string().required().label("Family")
        });

        const {error} = schema.validate(req.body, options);
        if (error) return responseValidationError(res, error);

        next();
    },
    gainedExpValidation: async (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().required().label("Character ID"),
            gained_exp: Joi.number().required().positive().min(100).label("Gained Exp")
        });

        const {error} = schema.validate(req.body, options);
        if (error) return responseValidationError(res, error);

        next();
    }
};
