const UserGameBiodataController = require('../../src/controllers/usergamebiodata.controller');
const UserGameBiodataService = require('../../src/services/usergamebiodata.service');

jest.mock('../../src/services/usergamebiodata.service');

describe('Unit Testing - UserGameBiodata / Characters API Territory', () => {
    afterAll(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('Unit Testing - Get Characters', () => {
        it('Should be get characters error when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.getUserCharacters.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            })
            await UserGameBiodataController.getUserCharacters(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: 'Internal Server Error' });
        });
    });

    describe('Unit Testing - Create Character', () => {
        it('Should be error create character when user biodata service throw error "Internal Server Error"', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.createNewCharacter.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.createNewCharacter(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: 'Internal Server Error' });
        });

        it('Should be success create character when user biodata service return created character', async () => {
            const charMock = {
                "experience": "0",
                "level": 0,
                "id": 1,
                "nickname": "raprmdn",
                "race": "Human",
                "type": "Fighter",
                "gender": "Male",
                "health": "4900",
                "mana": "2700",
                "userId": 1,
                "updatedAt": "2022-10-06T06:48:17.100Z",
                "createdAt": "2022-10-06T06:48:17.100Z",
                "guild": null,
                "family": null,
                "avatar": null
            };
            const req = { body: { nickname: "raprmdn", race: "Human", type: "Fighter", gender: "Male" }};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.createNewCharacter.mockImplementation(() => charMock);
            await UserGameBiodataController.createNewCharacter(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 201,
                success: true,
                message: 'Character created successfully',
                data: { character: charMock }
            });
        });
    });

    describe('Unit Testing - Change Character Nickname', () => {
        it('Should be error when user biodata service throw error "Internal Server Erro"r', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.changeNickname.mockImplementation(() => {
                throw { message: "Internal Server Error" };
            });
            await UserGameBiodataController.changeNickname(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: 'Internal Server Error' });
        });

        it('Should be error when user biodata service throw error Character not found', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.changeNickname.mockImplementation(() => {
                throw { status: 404, message: "Character not found" };
            });
            await UserGameBiodataController.changeNickname(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ status: 404, success: false, message: "Character not found" });
        });

        it('Should be success change nickname when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { nickname: 'raprmdn' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.changeNickname.mockImplementation(() => ({ id: 1, nickname: 'raprmdn' }));
            await UserGameBiodataController.changeNickname(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Nickname changed successfully',
                data: {  id: 1, nickname: 'raprmdn' }
            });
        });
    });

    describe('Unit Testing - Join Guild', () => {
        it('Should be error join guild when user biodata service throw error "Internal Server Err"or', async () => {
            const req = { params: {}, body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeGuild.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.joinGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success join guild when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { guild: 'Coalition' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeGuild.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', guild: 'Coalition' }));
            await UserGameBiodataController.joinGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Joined guild successfully',
                data: {  id: 1, nickname: 'raprmdn', guild: 'Coalition' }
            });
        });

    });

    describe('Unit Testing - Change Guild', () => {
        it('Should be error change guild when user biodata service throw error "Internal Server Erro"r', async () => {
            const req = { params: {}, body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeGuild.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.changeGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success change guild when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { guild: 'MixMax' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeGuild.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', guild: 'MixMax' }));
            await UserGameBiodataController.changeGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Changed guild successfully',
                data: {  id: 1, nickname: 'raprmdn', guild: 'MixMax' }
            });
        });

    });

    describe('Unit Testing - Leave Guild', () => {
        it('Should be error leave guild when user biodata service throw "Internal Server Error"', async () => {
            const req = { params: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.leaveGuild.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.leaveGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success leave guild when user biodata service return updated character', async () => {
            const req = {params: {nickname: 'raprmdn'}};
            const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

            UserGameBiodataService.leaveGuild.mockImplementation(() => ({id: 1, nickname: 'raprmdn', guild: null}));
            await UserGameBiodataController.leaveGuild(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Left guild successfully',
            });
        });

    });

    describe('Unit Testing - Join Family', () => {

        it('Should be error join family when user biodata service throw "Internal Server Error"', async () => {
            const req = { params: {}, body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeFamily.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.joinFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success join family when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { family: 'Ragnarok' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeFamily.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', family: 'Ragnarok' }));
            await UserGameBiodataController.joinFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Joined family successfully',
                data: {  id: 1, nickname: 'raprmdn', family: 'Ragnarok' }
            });
        });

    });

    describe('Unit Testing - Change Family', () => {
        it('Should be error change family when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: {}, body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeFamily.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.changeFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success change family when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { family: 'Crusade' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.joinOrChangeFamily.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', family: 'Crusade' }));
            await UserGameBiodataController.changeFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Changed family successfully',
                data: {  id: 1, nickname: 'raprmdn', family: 'Crusade' }
            });
        });
    });

    describe('Unit Testing - Leave Family', () => {

        it('Should be error leave family when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};

            UserGameBiodataService.leaveFamily.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.leaveFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success leave family when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};

            UserGameBiodataService.leaveFamily.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', family: null }));
            await UserGameBiodataController.leaveFamily(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Left family successfully',
            });
        });

    });

    describe('Unit Testing - Gained Experience', () => {
        it('Should be error gained exp when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: {}, body: {}};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.gainedExp.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.gainedExp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success gained exp when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: { id: 1, gained_exp: 35000 }};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.gainedExp.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', gained_exp: 35000, experience: 50000 }));
            await UserGameBiodataController.gainedExp(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Character gained exp',
                data: { id: 1, nickname: 'raprmdn', gained_exp: 35000, exp: 50000 }
            });
        });

    });

    describe('Unit Testing - Level Up', () => {
        it('Should be error level up when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: {}, body: {}};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.levelUp.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.levelUp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error',
            });
        });

        it('Should be success level up when user biodata service return updated character', async () => {
            const req = { params: { nickname: 'raprmdn' }, body: {}};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.levelUp.mockImplementation(() => ({ id: 1, nickname: 'raprmdn', level: 1 }));
            await UserGameBiodataController.levelUp(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Character leveled up',
                data: { id: 1, nickname: 'raprmdn', level: 1 }
            });
        });

    });

    describe('Unit Testing - Delete Character', () => {
        it('Should be error delete character when user biodata service throw error "Internal Server Error"', async () => {
            const req = { params: {}};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.deleteCharacter.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameBiodataController.deleteCharacter(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: 'Internal Server Error'
            });
        });

        it('Should be success delete character when user biodata service return deleted character', async () => {
            const req = { params: { nickname: 'raprmdn' }};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameBiodataService.deleteCharacter.mockImplementation(() => (1));
            await UserGameBiodataController.deleteCharacter(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Character deleted successfully'
            });
        });
    });

});
