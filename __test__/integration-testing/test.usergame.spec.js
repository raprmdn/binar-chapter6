const request = require('supertest');
const chai = require('chai');
const app = require('../../src/config/server.config');

const expect = chai.expect;

describe('Integration Testing - UserGame API Territory', () => {

    it('POST /api/auth/login : Should be login "The given data was invalid."', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': '', 'password': '' });

        expect(res.statusCode).to.equal(422);

        expect(res.body.status).to.be.equal(422);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('The given data was invalid.');
        expect(res.body).to.have.property('errors');
    });

    it('POST /api/auth/login : Should be login "These credentials do not match our records"', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456' });

        expect(res.statusCode).to.be.equal(404);

        expect(res.body.status).to.be.equal(404);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('These credentials do not match our records');
    });

    it('POST /api/auth/login : Should be login "User logged in successfully"', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456!' });

        expect(res.statusCode).to.be.equal(200);

        expect(res.body.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.message).to.be.equal('User logged in successfully');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data.user).to.have.property('id');
        expect(res.body.data.user).to.have.property('name');
        expect(res.body.data.user).to.have.property('username');
        expect(res.body.data.user).to.have.property('email');
        expect(res.body.data.user).to.have.property('token');
    });


});
