const request = require('supertest');
const chai = require('chai');
const app = require('../../src/config/server.config');
const jwt = require("jsonwebtoken");

const expect = chai.expect;

let token;
const payload = {
    id: 12041,
    username: 'fake_username',
    email: 'fake@email.com',
};
const fakeJWT = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '15m'})

describe('Integration Testing - UserGameHistory API Territory', () => {

    it('[POST]  /api/auth/login : Should be login success "User logged in successfully"', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set({ 'Content-Type': 'application/json' })
            .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456!' });

        expect(res.statusCode).to.equal(200);

        expect(res.body.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
        token = res.body.data.user.token;
    });

    it('[GET]   /api/histories : Should be error get all histories "Unauthorized"', async () => {
        const res = await request(app)
            .get('/api/histories')
            .set({ 'Content-Type': 'application/json' });

        expect(res.statusCode).to.equal(401);

        expect(res.body.status).to.be.equal(401);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('Unauthorized');
    });

    it('[GET]   /api/histories : Should be error get all histories "User not found"', async () => {
        const res = await request(app)
            .get('/api/histories')
            .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

        expect(res.statusCode).to.equal(404);

        expect(res.body.status).to.be.equal(404);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('User not found');
    });

    it('[GET]   /api/histories : Should be success get all histories "Success get all histories"', async () => {
        const res = await request(app)
            .get('/api/histories')
            .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

        expect(res.statusCode).to.equal(200);

        expect(res.body.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.message).to.be.equal('Success get all histories');
        expect(res.body).to.have.property('data');
    });

});
