const jwtUtils = require('../../src/utils/jwt.utils');
const { authentication } = require('../../src/middlewares/authentication.middleware');

const payload = { id: 1, username: 'test', email: 'test@email.com' };
const token = jwtUtils.generateToken(payload);

describe('JWT Utils', () => {

    it('Should generate a token', () => {
        expect(token).not.toBeNull();
        expect(token).not.toBeUndefined();
        expect(token).not.toBe('');
        expect(typeof token).toBe('string');
    });

    describe('Authentication Middleware', () => {

        it('Should return 401 if no authorization header is provided', () => {
            const req = { headers: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            authentication(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: 401,
                success: false,
                message: 'Unauthorized'
            });
        });

        it('Should return 401 if no token is provided', () => {
            const req = { headers: { authorization: 'Bearer' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            authentication(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: 401,
                success: false,
                message: 'The provided token is invalid.'
            });
        });

        it('Should return 401 if token is invalid', () => {
            const req = { headers: { authorization: 'Bearer ey' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            authentication(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: 401,
                success: false,
                message: 'The provided token is invalid.'
            });
        });

        it('Should return 401 if token is expired', () => {
            const expJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYXBybWRuIiwiZW1haWwiOiJyYXBybWRuQGdtYWlsLmNvbSIsImlhdCI6MTY2NjMyMjQ0OCwiZXhwIjoxNjY2MzIzMzQ4fQ.dtCB9qpy4szeTYUKJ8j_vc4B1T2X8E-CZAs-XjCV6cQ';
            const req = { headers: { authorization: `Bearer ${expJWT}` } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            authentication(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: 401,
                success: false,
                message: 'Unauthorized. Token Expired. Please login again.'
            });
        });
    });

});
