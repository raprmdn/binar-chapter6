const request = require('supertest');
const chai = require('chai');
const app = require('../../src/config/server.config');

const expect = chai.expect;

describe('Integration Testing - UserGame API Territory', () => {

    it('POST /api/auth/login : Should be login error "The given data was invalid."', async () => {
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

    it('POST /api/auth/login : Should be login error "These credentials do not match our records"', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456' });

        expect(res.statusCode).to.be.equal(404);

        expect(res.body.status).to.be.equal(404);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('These credentials do not match our records');
    });

    it('POST /api/auth/login : Should be login success "User logged in successfully"', async () => {
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

    it('POST /api/auth/register : Should be register error "The given data was invalid."', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({ 'name': '', 'username': '', 'email': '', 'password': '', 'password_confirmation': '' });

        expect(res.statusCode).to.equal(422);

        expect(res.body.status).to.be.equal(422);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('The given data was invalid.');
        expect(res.body).to.have.property('errors');
    });

    it('POST /api/auth/register : Should be register error "Username already exists"', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                'name': "Rafi Putra Ramadhan",
                'username': 'raprmdn',
                'email': 'raprmdn@gmail.com',
                'password': 'Abc123456!',
                'password_confirmation': 'Abc123456!'
            });

        expect(res.statusCode).to.equal(422);

        expect(res.body.status).to.be.equal(422);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('The given data was invalid.');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.username).to.be.equal('Username already exists');
    });

    it('POST /api/auth/register : Should be register error "Email already exists"', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                'name': "Rafi Putra Ramadhan",
                'username': 'raprmdnn',
                'email': 'raprmdn@gmail.com',
                'password': 'Abc123456!',
                'password_confirmation': 'Abc123456!'
            });

        expect(res.statusCode).to.equal(422);

        expect(res.body.status).to.be.equal(422);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.message).to.be.equal('The given data was invalid.');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.email).to.be.equal('Email already exists');
    });

    it('POST /api/auth/register : Should be register success "User registered successfully"', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                'name': "Rafi Putra Ramadhan",
                'username': 'raprmdnn',
                'email': 'raprmdnn@email.com',
                'password': 'Abc123456!',
                'password_confirmation': 'Abc123456!'
            });

        expect(res.statusCode).to.be.equal(201);

        expect(res.body.status).to.be.equal(201);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.message).to.be.equal('User registered successfully');
    });
});
