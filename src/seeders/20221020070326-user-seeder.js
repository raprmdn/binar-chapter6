'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('UserGames', [
            {
                name: 'Rafi Putra Ramadhan',
                username: 'raprmdn',
                email: 'raprmdn@gmail.com',
                password: await bcrypt.hash('Abc123456!', 10),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserGames', null, {});
    }
};
