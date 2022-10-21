const UserGameController = require('../../src/controllers/usergame.controller');
const UserGameService = require('../../src/services/usergame.service');

jest.mock('../../src/services/usergame.service');

describe('Unit Testing - UserGame / User API Territory', () => {
    afterAll(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('Unit Testing - Register Testing', () => {

        it('Should be register error when user service throw error', async () => {
            const req = { body: { name: 'Test', username: 'test', email: 'test@email.com', password: 'Abc123456!' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.register.mockImplementation(() => {
                throw new Error('Internal Server Error');
            });

            await UserGameController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status:500, success: false, message: 'Internal Server Error' });
        });

        it('Should be register success when user service return user', async () => {
            const mockUser = { name: 'Test', username: 'test', email: 'test@email.com', password: 'Abc123456!' };
            const req = { body: mockUser };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.register.mockImplementation(() => mockUser);

            await UserGameController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ status: 201, success: true, message: 'User registered successfully' });
        });

    });

    describe('Unit Testing - Login Testing', () => {

        it('Should be login error when user service throw error "These credentials do not match our records"', async () => {
            const req = { body: { email: '', password: '' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.login.mockImplementation(() => {
                throw { status: 404, message: "These credentials do not match our records" };
            })

            await UserGameController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ status: 404, success: false, message: "These credentials do not match our records" });
        });

        it('Should be login error when user service throw error "Internal Server Error"', async () => {
            const req = { body: { email: '', password: '' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.login.mockImplementation(() => {
                throw { message: "Internal Server Error" };
            })

            await UserGameController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: "Internal Server Error" });
        });

        it('Should be login success when user service return user', async () => {
            const mockUser = { id: 1, name: 'Test', username: 'test', email: 'test@email.com', token: 'token' };
            const req = { body: { email: '', password: '' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.login.mockImplementation(() => mockUser);
            await UserGameController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 200, success: true, message: 'User logged in successfully', data: { user: mockUser } });
        });

    });

    describe('Unit Testing - Authenticated User / Me Testing', () => {

        it('Should be authenticated user error when user service throw error', async () => {
            const req = { user: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.me.mockImplementation(() => {
                throw { status: 500, message: 'Internal Server Error' };
            });
            await UserGameController.me(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: 'Internal Server Error' });
        });

        it('Should be success when user service return user', async () => {
            const mockUser = { id: 1, name: 'Test', username: 'test', email: 'test@email.com', token: 'token' };
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.me.mockImplementation(() => mockUser);
            await UserGameController.me(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 200, success: true, message: 'User retrieved successfully', data: { user: mockUser } });
        });

    });

    describe('Unit Testing - Change Password Testing', () => {

        it('Should be change password error when user service throw error "Wrong current password"', async () => {
            const req = { body: { current_password: 'a', new_password: 'b' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.changePassword.mockImplementation(() => {
                throw { status: 422, message: "Wrong current password" };
            });
            await UserGameController.changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(422);
            expect(res.json).toHaveBeenCalledWith({ status: 422, success: false, message: "Wrong current password" });
        });

        it('Should be change password error when user service throw error "Internal Server Error"', async () => {
            const req = { body: { current_password: 'a', new_password: 'b' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.changePassword.mockImplementation(() => {
                throw { message: "Internal Server Error" };
            });
            await UserGameController.changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ status: 500, success: false, message: "Internal Server Error" });
        });

        it('Should be change password success when user service return number of affected field', async () => {
            const req = { body: { current_password: 'a', new_password: 'b' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            UserGameService.changePassword.mockImplementation(() => 1);
            await UserGameController.changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 200, success: true, message: 'Password changed successfully' });
        })

    });

});
