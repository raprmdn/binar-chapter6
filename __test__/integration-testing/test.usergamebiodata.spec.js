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

const okResponse = (res) => {
    expect(res.statusCode).to.equal(200);

    expect(res.body.status).to.be.equal(200);
    expect(res.body.success).to.be.equal(true);
};

const unauthorizedResponse = (res) => {
    expect(res.statusCode).to.equal(401);

    expect(res.body.status).to.be.equal(401);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.message).to.be.equal('Unauthorized');
};

const unprocessableEntity = (res) => {
    expect(res.statusCode).to.equal(422);

    expect(res.body.status).to.be.equal(422);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.message).to.be.equal('The given data was invalid.');
    expect(res.body).to.have.property('errors')
};

const notFoundResponse = (res) => {
    expect(res.statusCode).to.equal(404);

    expect(res.body.status).to.be.equal(404);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.message).to.be.equal('Character not found');
};

const idNotValidReponse = (res) => {
    expect(res.statusCode).to.equal(400);

    expect(res.body.status).to.be.equal(400);
    expect(res.body.success).to.be.equal(false);
    expect(res.body.message).to.be.equal('Character id is not valid');
};

const idNotAllowedResponse = (res) => {
    expect(res.statusCode).to.equal(403);

    expect(res.body.status).to.be.equal(403);
    expect(res.body.success).to.be.equal(false);
};

describe('Integration Testing - UserGameBiodata / Characters API Territory', () => {

    it('[POST]  /api/auth/login : Should be login success "User logged in successfully"', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set({ 'Content-Type': 'application/json' })
            .send({ 'email': 'raprmdn@gmail.com', 'password': 'Abc123456!' });

        okResponse(res);
        token = res.body.data.user.token;
    });

    // Characters

    describe('Integration Testing - Characters Testing', () => {
        it('[GET]   /api/characters : Should be get characters error "Unauthorized"', async () => {
            const res = await request(app)
                .get('/api/characters')
                .set({ 'Content-Type': 'application/json' });

            unauthorizedResponse(res);
        });

        it('[GET]   /api/characters : Should be success get characters list "Characters retrieved successfully"', async () => {
            const res = await request(app)
                .get('/api/characters')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Characters retrieved successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('total_characters');
            expect(res.body.data).to.have.property('characters');
            expect(Array.isArray(res.body.data.characters)).to.be.equal(true);
        });

        it('[POST]  /api/characters : Should be error create character "Unauthorized"', async () => {
            const res = await request(app)
                .post('/api/characters')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'nickname': 'raprmdn', 'race': 'Human', 'type': 'Fighter', 'gender': 'Male' });

            unauthorizedResponse(res);
        });

        it('[POST]  /api/characters : Should be error create character "The given data was invalid."', async () => {
            const res = await request(app)
                .post('/api/characters')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'nickname': '', 'race': '', 'type': '', 'gender': '' });

            unprocessableEntity(res);
        });

        it('[POST]  /api/characters : Should be error create character "Nickname already exists"', async () => {
            const res = await request(app)
                .post('/api/characters')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'nickname': 'raprmdn', 'race': 'Human', 'type': 'Fighter', 'gender': 'Male' });

            unprocessableEntity(res);
            expect(res.body.errors).to.have.property('nickname');
            expect(res.body.errors.nickname).to.be.equal('Nickname already exists');
        });

        it('[POST]  /api/characters : Should be success create character "Character created successfully"', async () => {
            const res = await request(app)
                .post('/api/characters')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'nickname': 'Lumiere', 'race': 'Human', 'type': 'Rogue', 'gender': 'Female' });

            expect(res.statusCode).to.equal(201);

            expect(res.body.status).to.be.equal(201);
            expect(res.body.success).to.be.equal(true);
            expect(res.body.message).to.be.equal('Character created successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('character');
        });
    });

    // Change Nickname

    describe('Integration Testing - Change Nickname Testing', () => {

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'nickname': 'Lumiere' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'nickname': 'raprmdn' });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'nickname': '' });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'nickname': 'raprmdnn' });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "You are not allowed to change this character\'s nickname"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'nickname': 'raprmdnn' });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s nickname');
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be error change nickname "Nickname already exists"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'nickname': 'Lumiere' });

            unprocessableEntity(res);
            expect(res.body.errors).to.have.property('nickname');
            expect(res.body.errors.nickname).to.be.equal('Nickname already exists');
        });

        it('[PATCH] /api/characters/:nickname/change-nickname : Should be success change nickname "Nickname changed successfully"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-nickname')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'nickname': 'raprmdn' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Nickname changed successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
        });

    });

    // Join Guild

    describe('Integration Testing - Join Guild Testing', () => {

        it('[PATCH] /api/characters/:nickname/join-guild : Should be error join guild "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-guild')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'guild': 'Coalition' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-guild : Should be error join guild "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/join-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'guild': 'Coalition' });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-guild : Should be error join guild "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': '', 'guild': '' });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/join-guild : Should be error join guild "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'guild': 'Coalition' });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-guild : Should be error join guild "You are not allowed to change this character\'s guild"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'guild': 'Coalition' });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s guild');
        });

        it('[PATCH] /api/characters/:nickname/join-guild : Should be success join guild "Joined guild successfully"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'guild': 'Coalition' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Joined guild successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('guild');
        });

    });

    // Change Guild

    describe('Integration Testing - Change Guild Testing', () => {

        it('[PATCH] /api/characters/:nickname/change-guild : Should be error change guild "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-guild')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'guild': 'MixMax' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-guild : Should be error change guild "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/change-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'guild': 'MixMax' });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-guild : Should be error change guild "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': '', 'guild': '' });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/change-guild : Should be error change guild "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'guild': 'MixMax' });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-guild : Should be error change guild "You are not allowed to change this character\'s guild"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'guild': 'MixMax' });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s guild');
        });

        it('[PATCH] /api/characters/:nickname/change-guild : Should be success change guild "Changed guild successfully"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'guild': 'MixMax' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Changed guild successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('guild');
        });

    });

    // Leave Guild

    describe('Integration Testing - Leave Guild Testing', () => {

        it('[DELETE] /api/characters/:nickname/leave-guild : Should be error leave guild "Unauthorized"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-guild')
                .set({ 'Content-Type': 'application/json' });

            unauthorizedResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/leave-guild : Should be error leave guild "Character not found"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdnn/leave-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            notFoundResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/leave-guild : Should be error leave guild "Character is not in any guild"', async () => {
            const res = await request(app)
                .delete('/api/characters/Lumiere/leave-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            expect(res.statusCode).to.equal(400);

            expect(res.body.status).to.be.equal(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('Character is not in any guild');
        });

        it('[DELETE] /api/characters/:nickname/leave-guild : Should be error leave guild "You are not allowed to change this character\'s guild"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s guild');
        });

        it('[DELETE] /api/characters/:nickname/leave-guild : Should be success leave guild "Left guild successfully"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-guild')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Left guild successfully');
        });

    });

    // Join Family

    describe('Integration Testing - Join Family Testing', () => {

        it('[PATCH] /api/characters/:nickname/join-family : Should be error join family "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-family')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'family': 'Ragnarok' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-family : Should be error join family "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/join-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'family': 'Ragnarok' });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-family : Should be error join family "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': '', 'family': '' });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/join-family : Should be error join family "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'family': 'Ragnarok' });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/join-family : Should be error join family "You are not allowed to change this character\'s family"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'family': 'Ragnarok' });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s family');
        });

        it('[PATCH] /api/characters/:nickname/join-family : Should be success join family "Joined family successfully"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/join-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'family': 'Ragnarok' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Joined family successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('family');
        });

    });

    // Change Family

    describe('Integration Testing - Change Family Testing', () => {

        it('[PATCH] /api/characters/:nickname/change-family : Should be error change family "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-family')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'family': 'Crusade' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-family : Should be error change family "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/change-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'family': 'Crusade' });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-family : Should be error change family "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': '', 'family': '' });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/change-family : Should be error change family "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'family': 'Crusade' });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/change-family : Should be error change family "You are not allowed to change this character\'s family"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'family': 'Ragnarok' });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s family');
        });

        it('[PATCH] /api/characters/:nickname/change-family : Should be success change family "Changed family successfully"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/change-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'family': 'Crusade' });

            okResponse(res);
            expect(res.body.message).to.be.equal('Changed family successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('family');
        });

    });

    // Leave Family

    describe('Integration Testing - Leave Family Testing', () => {

        it('[DELETE] /api/characters/:nickname/leave-family : Should be error leave family "Unauthorized"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-family')
                .set({ 'Content-Type': 'application/json' });

            unauthorizedResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/leave-family : Should be error leave family "Character not found"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdnn/leave-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            notFoundResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/leave-family : Should be error leave family "Character is not in any family"', async () => {
            const res = await request(app)
                .delete('/api/characters/Lumiere/leave-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            expect(res.statusCode).to.equal(400);

            expect(res.body.status).to.be.equal(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('Character is not in any family');
        });

        it('[DELETE] /api/characters/:nickname/leave-family : Should be error leave family "You are not allowed to change this character\'s family"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s family');
        });

        it('[DELETE] /api/characters/:nickname/leave-family : Should be success leave family "Left family successfully"', async () => {
            const res = await request(app)
                .delete('/api/characters/raprmdn/leave-family')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Left family successfully');
        });

    });

    // Gained Experience

    describe('Integration Testing - Gained Experience Testing', () => {

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be error gained exp "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/gained-exp')
                .set({ 'Content-Type': 'application/json' })
                .send({ 'id': 1, 'gained_exp': 35000 });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be error gained exp "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/gained-exp')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'gained_exp': 35000 });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be error gained exp "The given data was invalid."', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/gained-exp')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'gained_exp': 0 });

            unprocessableEntity(res);
        });

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be error gained exp "Character id is not valid"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/gained-exp')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 100, 'gained_exp': 35000 });

            idNotValidReponse(res);
        });

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be error gained exp "You are not allowed to change this character\'s exp"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/gained-exp')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` })
                .send({ 'id': 1, 'gained_exp': 35000 });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s exp');
        });

        it('[PATCH] /api/characters/:nickname/gained-exp : Should be success gained exp "Character gained exp"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/gained-exp')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                .send({ 'id': 1, 'gained_exp': 35000 });

            okResponse(res);
            expect(res.body.message).to.be.equal('Character gained exp');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('gained_exp');
            expect(res.body.data).to.have.property('exp');
        });

    });

    // Level Up

    describe('Integration Testing - Level Up Testing', () => {

        it('[PATCH] /api/characters/:nickname/level-up : Should be error level up "Unauthorized"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/level-up')
                .set({ 'Content-Type': 'application/json' });

            unauthorizedResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/level-up : Should be error level up "Character not found"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdnn/level-up')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            notFoundResponse(res);
        });

        it('[PATCH] /api/characters/:nickname/level-up : Should be error gained exp "You are not allowed to change this character\'s level"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/level-up')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to change this character\'s level');
        });

        it('[PATCH] /api/characters/:nickname/level-up : Should be success level up "Character leveled up"', async () => {
            const res = await request(app)
                .patch('/api/characters/raprmdn/level-up')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Character leveled up');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('nickname');
            expect(res.body.data).to.have.property('level');
        });

    });

    // Delete Character

    describe('Integration Testing - Delete Character Testing', () => {

        it('[DELETE] /api/characters/:nickname/delete-character : Should be error delete character "Unauthorized"', async () => {
            const res = await request(app)
                .delete('/api/characters/Lumiere/delete-character')
                .set({ 'Content-Type': 'application/json' });

            unauthorizedResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/delete-character : Should be error delete character "Character not found"', async () => {
            const res = await request(app)
                .delete('/api/characters/lumiere/delete-character')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            notFoundResponse(res);
        });

        it('[DELETE] /api/characters/:nickname/delete-character : Should be error delete character "User not found"', async () => {
            const res = await request(app)
                .delete('/api/characters/Lumiere/delete-character')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${fakeJWT}` });

            expect(res.statusCode).to.be.equal(404);

            expect(res.status).to.be.equal(404);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.equal('User not found');
        });

        it('[DELETE] /api/characters/:nickname/delete-character : Should be error delete character "You are not allowed to delete this character"', async () => {
            const payload = {
                id: 2,
                username: 'raprmdnn',
                email: 'raprmdnn@gmail.com',
            };
            const notCurrentUserJWT = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
            const res = await request(app)
                .delete('/api/characters/Lumiere/delete-character')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${notCurrentUserJWT}` });

            idNotAllowedResponse(res);
            expect(res.body.message).to.be.equal('You are not allowed to delete this character');
        });

        it('[DELETE] /api/characters/:nickname/delete-character : Should be success delete character "Character deleted successfully"', async () => {
            const res = await request(app)
                .delete('/api/characters/Lumiere/delete-character')
                .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

            okResponse(res);
            expect(res.body.message).to.be.equal('Character deleted successfully');
        });

    });

});
