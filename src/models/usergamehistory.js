'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserGameHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserGameHistory.belongsTo(models.UserGame, {
                foreignKey: 'userId',
                as: 'user',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }

    UserGameHistory.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserGames',
                key: 'id',
                as: 'userId'
            }
        },
        eventType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'UserGameHistory'
    });
    return UserGameHistory;
};