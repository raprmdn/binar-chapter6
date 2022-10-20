'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('UserGameBiodata', [
            {
                userId: 1,
                nickname: 'raprmdn',
                race: 'Human',
                type: 'Fighter',
                gender: 'Male',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserGameBiodata', null, {});
    }
};
