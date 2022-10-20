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
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
