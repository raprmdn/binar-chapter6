'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserGameBiodata', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'UserGames',
                    key: 'id',
                    as: 'userId'
                }
            },
            nickname: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            guild: {
                type: Sequelize.STRING,
            },
            family: {
                type: Sequelize.STRING
            },
            experience: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 0
            },
            health: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 3000
            },
            mana: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 1500
            },
            race: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gender: {
                type: Sequelize.STRING,
                allowNull: false
            },
            level: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            avatar: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserGameBiodata');
    }
};