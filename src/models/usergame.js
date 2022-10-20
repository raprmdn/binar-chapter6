'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserGame extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserGame.hasMany(models.UserGameBiodata, {
                foreignKey: 'userId',
                as: {
                    singular: 'biodata',
                    plural: 'biodata'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });

            UserGame.hasMany(models.UserGameHistory, {
                foreignKey: 'userId',
                as: {
                    singular: 'history',
                    plural: 'histories'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                hooks: true
            });
        }
    }

    UserGame.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'UserGame'
    });
    return UserGame;
};