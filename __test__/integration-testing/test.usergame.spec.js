const request = require('supertest');
const chai = require('chai');
const app = require('../../src/config/server.config');
const jwt = require('jsonwebtoken');

const expect = chai.expect;

let token;

const unprocessableEntity = (res) => {
    expect(res.statusCode).to.equal(422);

    expect(res.body.status).to.be.equal(422);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.message).to.be.equal('The given data was invalid.');
    expect(res.body).to.have.property('errors');
};

const okResponse = (res) => {
    expect(res.statusCode).to.equal(200);

    expect(res.body.status).to.be.equal(200);
    expect(res.body.success).to.be.equal(true);
};

describe('Integration Testing - UserGame API Territory', () => {

    describe('Integration Testing - Login Testing', () => {

        it('[POST]  /api/auth/login : Should be login error "The given data was invalid."', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'email': '', 'password': '' });

            unprocessableEntity(res);
        });

        it('[POST]  /api/auth/login : Should be login error "These credentials do not match our records" User doesnt exists', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'email': 'raprmdnnn@gmail.com', 'password': 'Abc123456!' });

            expect(res.statusCode).to.be.equal(404);

            expect(res.body.status).to.be.equal(404);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('These credentials do not match our records');
        });

        it('[POST]  /api/auth/login : Should be login error "These credentials do not match our records" Password doesn\'t match', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456' });

            expect(res.statusCode).to.be.equal(404);

            expect(res.body.status).to.be.equal(404);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('These credentials do not match our records');
        });

        it('[POST]  /api/auth/login : Should be login success "User logged in successfully"', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456!' });

            okResponse(res);
            expect(res.body.message).to.be.equal('User logged in successfully');
            expect(res.body.data).to.have.property('user');
            expect(res.body.data.user).to.have.property('id');
            expect(res.body.data.user).to.have.property('name');
            expect(res.body.data.user).to.have.property('username');
            expect(res.body.data.user).to.have.property('email');
            expect(res.body.data.user).to.have.property('token');

            token = res.body.data.user.token;
        });

    })

    describe('Integration Testing - Registration Testing', () => {

        it('[POST]  /api/auth/register : Should be register error "The given data was invalid."', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'name': '', 'username': '', 'email': '', 'password': '', 'password_confirmation': '' });

            unprocessableEntity(res);
        });

        it('[POST]  /api/auth/register : Should be register error "Username already exists"', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .set({ 'Content-Type': 'application/json' })
                .send({
                    'name': "Rafi Putra Ramadhan",
                    'username': 'raprmdn',
                    'email': 'raprmdn@gmail.com',
                    'password': 'Abc123456!',
                    'password_confirmation': 'Abc123456!'
                });

            unprocessableEntity(res);
            expect(res.body.errors.username).to.be.equal('Username already exists');
        });

        it('[POST]  /api/auth/register : Should be register error "Email already exists"', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .set({ 'Content-Type': 'application/json' })
                .send({
                    'name': "Rafi Putra Ramadhan",
                    'username': 'raprmdnn',
                    'email': 'raprmdn@gmail.com',
                    'password': 'Abc123456!',
                    'password_confirmation': 'Abc123456!'
                });

            unprocessableEntity(res);
            expect(res.body.errors.email).to.be.equal('Email already exists');
        });

        it('[POST]  /api/auth/register : Should be register success "User registered successfully"', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .set({ 'Content-Type': 'application/json' })
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

    })

    describe('Integration Testing - Authenticated User Test', () => {

        it('[GET]   /api/auth/me : Should be get user error "User not found"', async () => {
            const payload = { id: 1000, username: 'raprmdns', email: 'raprmdns@email.com' };
            const fakeJWT = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
            const res = await request(app)
                .get('/api/auth/me')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

            expect(res.statusCode).to.be.equal(404);

            expect(res.body.status).to.be.equal(404);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('User not found');
        });

        it('[GET]   /api/auth/me : Should be get user error "Unauthorized"', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set({ 'Content-Type': 'application/json' });

            expect(res.statusCode).to.be.equal(401);

            expect(res.body.status).to.be.equal(401);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('Unauthorized');
        });

        it('[GET]   /api/auth/me : Should be get user success "User retrieved successfully"', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.success).to.be.equal(true);
            expect(res.body.message).to.be.equal('User retrieved successfully');
            expect(res.body.data).to.have.property('user');
            expect(res.body.data.user).to.have.property('id');
            expect(res.body.data.user).to.have.property('name');
            expect(res.body.data.user).to.have.property('username');
            expect(res.body.data.user).to.have.property('email');
        });

    });

    describe('Integration Testing - Change Password Test', () => {

        it('[PATCH] /api/auth/change-password : Should be change password error "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/auth/change-password')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'current_password': '', 'new_password': '', 'password_confirmation': '' });

            unprocessableEntity(res);
        });

        it('[PATCH]   /api/auth/change-password : Should be change password error "User not found"', async () => {
            const payload = { id: 1000, username: 'raprmdns', email: 'raprmdns@email.com' };
            const fakeJWT = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
            const res = await request(app)
                .patch('/api/auth/change-password')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'current_password': 'Abc123456', 'new_password': 'Abc123456!', 'password_confirmation': 'Abc123456!' });

            expect(res.statusCode).to.be.equal(404);

            expect(res.body.status).to.be.equal(404);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('User not found');
        });

        it('[PATCH] /api/auth/change-password : Should be change password error "Wrong current password"', async () => {
            const res = await request(app)
                .patch('/api/auth/change-password')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'current_password': 'Abc123456', 'new_password': 'Abc123456!', 'password_confirmation': 'Abc123456!' });

            expect(res.statusCode).to.be.equal(422);

            expect(res.body.status).to.be.equal(422);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('Wrong current password');
        });

        it('[PATCH] /api/auth/change-password : Should be change password success "Password changed successfully"', async () => {
            const res = await request(app)
                .patch('/api/auth/change-password')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'current_password': 'Abc123456!', 'new_password': 'Abc123456!', 'password_confirmation': 'Abc123456!' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Password changed successfully');
        });

    });

    describe('Integration Testing - Logout Test', () => {

        it('[POST]  /api/auth/logout : Should be logout error "Unauthorized"', async () => {
            const res = await request(app)
                .post('/api/auth/logout')
                .set({ 'Content-Type': 'application/json' });

            expect(res.statusCode).to.be.equal(401);

            expect(res.body.status).to.be.equal(401);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('Unauthorized');
        });

        it('[POST]  /api/auth/logout : Should be logout success "Logged out successfully"', async () => {
            const res = await request(app)
                .post('/api/auth/logout')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Logged out successfully');
        });

    });
});
