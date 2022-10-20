const UserGameBiodataService = require('../services/usergamebiodata.service');
const {response} = require("../utils/response.utils");

module.exports = {
    getUserCharacters: async (req, res) => {
        try {
            const characters = await UserGameBiodataService.getUserCharacters(req.user);
            return response(res, 200, true, "Characters retrieved successfully", {
                total_characters: characters.toJSON().total_characters,
                characters: characters.biodata
            });
        } catch (err) {
            return response(res, 500, false, err.message);
        }
    },
    createNewCharacter: async (req, res) => {
        try {
            const character = await UserGameBiodataService.createNewCharacter(req.body, req.user);
            return response(res, 201, true, "Character created successfully", {character});
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    changeNickname: async (req, res) => {
        try {
            const character = await UserGameBiodataService.changeNickname(req.params, req.user, req.body);
            return response(res, 200, true, "Nickname changed successfully", {
                id: character.id,
                nickname: character.nickname
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    joinGuild: async (req, res) => {
        try {
            const character = await UserGameBiodataService.joinOrChangeGuild(req.params, req.user, req.body);
            return response(res, 200, true, "Joined guild successfully", {
                id: character.id,
                nickname: character.nickname,
                guild: character.guild
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    changeGuild: async (req, res) => {
        try {
            const character = await UserGameBiodataService.joinOrChangeGuild(req.params, req.user, req.body);
            return response(res, 200, true, "Changed guild successfully", {
                id: character.id,
                nickname: character.nickname,
                guild: character.guild
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    leaveGuild: async (req, res) => {
        try {
            await UserGameBiodataService.leaveGuild(req.params, req.user);
            return response(res, 200, true, "Left guild successfully");
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    joinFamily: async (req, res) => {
        try {
            const character = await UserGameBiodataService.joinOrChangeFamily(req.params, req.user, req.body);
            return response(res, 200, true, "Joined family successfully", {
                id: character.id,
                nickname: character.nickname,
                family: character.family
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    changeFamily: async (req, res) => {
        try {
            const character = await UserGameBiodataService.joinOrChangeFamily(req.params, req.user, req.body);
            return response(res, 200, true, "Changed family successfully", {
                id: character.id,
                nickname: character.nickname,
                family: character.family
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    leaveFamily: async (req, res) => {
        try {
            await UserGameBiodataService.leaveFamily(req.params, req.user);
            return response(res, 200, true, "Left family successfully");
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    gainedExp: async (req, res) => {
        try {
            const character = await UserGameBiodataService.gainedExp(req.params, req.user, req.body);
            return response(res, 200, true, "Character gained exp", {
                id: character.id,
                nickname: character.nickname,
                gained_exp: req.body.gained_exp,
                exp: character.experience
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    levelUp: async (req, res) => {
        try {
            const character = await UserGameBiodataService.levelUp(req.params, req.user);
            return response(res, 200, true, "Character leveled up", {
                id: character.id,
                nickname: character.nickname,
                level: character.level
            });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    deleteCharacter: async (req, res) => {
        try {
            await UserGameBiodataService.deleteCharacter(req.params, req.user);
            return response(res, 200, true, "Character deleted successfully");
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    }
}