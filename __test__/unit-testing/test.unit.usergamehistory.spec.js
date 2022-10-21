const UserGameHistoryController = require('../../src/controllers/usergamehistory.controller');
const UserGameHistoryService = require('../../src/services/usergamehistory.service');

jest.mock('../../src/services/usergamehistory.service');

describe('Unit Testing - UserGameBiodata / Histories API Territory', () => {
    afterAll(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('Unit Testing - Get Histories', () => {

        it('Should be error when the user game history service throw error "Internal Server Error"', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameHistoryService.getAll.mockImplementation(() => {
                throw { message: 'Internal Server Error' };
            });
            await UserGameHistoryController.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: 'Internal Server Error' });
        });

        it('Should be success get all histories when the service return user histories', async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const histories = [
                {
                    "id": 9,
                    "userId": 1,
                    "eventType": "LEVEL_UP",
                    "subject": {
                        "event_type": "LEVEL_UP",
                        "triggered_character_id": 1,
                        "triggered_character_by_user_id": 1,
                        "previous_level": 0,
                        "updated_level": 1,
                        "meta": {
                            "id": 1,
                            "user_id": 1,
                            "previous_data": {
                                "id": 1,
                                "userId": 1,
                                "nickname": "raprmdn",
                                "guild": null,
                                "family": null,
                                "experience": "35000",
                                "health": "4900",
                                "mana": "2700",
                                "race": "Human",
                                "type": "Fighter",
                                "gender": "Male",
                                "level": 0,
                                "avatar": null,
                                "createdAt": "2022-10-06T06:48:17.100Z",
                                "updatedAt": "2022-10-06T06:51:00.109Z"
                            },
                            "updated_data": {
                                "id": 1,
                                "userId": 1,
                                "nickname": "raprmdn",
                                "guild": null,
                                "family": null,
                                "experience": "35000",
                                "health": "4900",
                                "mana": "2700",
                                "race": "Human",
                                "type": "Fighter",
                                "gender": "Male",
                                "level": 1,
                                "avatar": null,
                                "createdAt": "2022-10-06T06:48:17.100Z",
                                "updatedAt": "2022-10-06T06:51:15.272Z"
                            }
                        }
                    },
                    "createdAt": "2022-10-06T06:51:15.277Z",
                    "updatedAt": "2022-10-06T06:51:15.277Z"
                },
            ];

            UserGameHistoryService.getAll.mockImplementation(() => histories);
            await UserGameHistoryController.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: 'Success get all histories',
                data: histories
            });
        });

    });
});
