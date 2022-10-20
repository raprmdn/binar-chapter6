'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserGameBiodata extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserGameBiodata.belongsTo(models.UserGame, {
                foreignKey: 'userId',
                as: 'user',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });
        }
    }

    UserGameBiodata.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserGames',
                key: 'id',
                as: 'userId'
            }
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        guild: DataTypes.STRING,
        family: DataTypes.STRING,
        experience: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        health: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 3000
        },
        mana: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1500
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'UserGameBiodata',
        hooks: {
            afterCreate: async (instance, options) => {
                const {UserGame} = sequelize.models;
                const user = await UserGame.findByPk(instance.userId);
                await user.createHistory({ eventType: "CREATE_CHARACTER",
                    subject: {
                        "event_type": "CREATE_CHARACTER",
                        "triggered_character_by_user_id": instance.userId,
                        "meta": instance
                    }
                });
            },
            afterUpdate: async (instance, options) => {
                const {UserGame} = sequelize.models;
                const user = await UserGame.findByPk(instance.userId);

                if (instance.changed('nickname')) {
                    await user.createHistory({ eventType: "CHANGE_NICKNAME",
                        subject: {
                            "event_type": "CHANGE_NICKNAME",
                            "triggered_character_id": instance.id,
                            "triggered_character_by_user_id": instance.userId,
                            "previous_nickname": instance.previous('nickname'),
                            "updated_nickname": instance.nickname,
                            "meta": {
                                "id": instance.id,
                                "user_id": instance.userId,
                                "previous_data": instance._previousDataValues,
                                "updated_data": instance.dataValues
                            }
                        }
                    });
                }

                if (instance.changed('guild')) {
                    if (instance.previous('guild') === null) {
                        await user.createHistory({ eventType: "JOIN_GUILD",
                            subject: {
                                "event_type": "JOIN_GUILD",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "joined_guild": instance.guild,
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }

                    if (instance.previous('guild') !== null && instance.guild === null) {
                        await user.createHistory({ eventType: "LEAVE_GUILD",
                            subject: {
                                "event_type": "LEAVE_GUILD",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "left_guild": instance.previous('guild'),
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }

                    if (instance.previous('guild') !== null && instance.guild !== null) {
                        await user.createHistory({ eventType: "CHANGE_GUILD",
                            subject: {
                                "event_type": "CHANGE_GUILD",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "left_guild": instance.previous('guild'),
                                "joined_guild": instance.guild,
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }
                }

                if (instance.changed('family')) {
                    if (instance.previous('family') === null) {
                        await user.createHistory({ eventType: "JOIN_FAMILY",
                            subject: {
                                "event_type": "JOIN_FAMILY",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "joined_family": instance.family,
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }

                    if (instance.previous('family') !== null && instance.family === null) {
                        await user.createHistory({ eventType: "LEAVE_FAMILY",
                            subject: {
                                "event_type": "LEAVE_FAMILY",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "left_family": instance.previous('family'),
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }

                    if (instance.previous('family') !== null && instance.family !== null) {
                        await user.createHistory({ eventType: "CHANGE_FAMILY",
                            subject: {
                                "event_type": "CHANGE_FAMILY",
                                "triggered_character_id": instance.id,
                                "triggered_character_by_user_id": instance.userId,
                                "left_family": instance.previous('family'),
                                "joined_family": instance.family,
                                "meta": {
                                    "id": instance.id,
                                    "user_id": instance.userId,
                                    "previous_data": instance._previousDataValues,
                                    "updated_data": instance.dataValues
                                }
                            }
                        });
                    }
                }

                if (instance.changed('experience')) {
                    await user.createHistory({ eventType: "GAINED_EXPERIENCE",
                        subject: {
                            "event_type": "CHANGE_EXPERIENCE",
                            "triggered_character_id": instance.id,
                            "triggered_character_by_user_id": instance.userId,
                            "gained_experience": instance.experience - instance.previous('experience'),
                            "previous_experience": instance.previous('experience'),
                            "updated_experience": instance.experience,
                            "meta": {
                                "id": instance.id,
                                "user_id": instance.userId,
                                "previous_data": instance._previousDataValues,
                                "updated_data": instance.dataValues
                            }
                        }
                    });
                }

                if (instance.changed('level')) {
                    await user.createHistory({ eventType: "LEVEL_UP",
                        subject: {
                            "event_type": "LEVEL_UP",
                            "triggered_character_id": instance.id,
                            "triggered_character_by_user_id": instance.userId,
                            "previous_level": instance.previous('level'),
                            "updated_level": instance.level,
                            "meta": {
                                "id": instance.id,
                                "user_id": instance.userId,
                                "previous_data": instance._previousDataValues,
                                "updated_data": instance.dataValues
                            }
                        }
                    });
                }
            },
            afterDestroy: async (instance, options) => {
                const {UserGame} = sequelize.models;
                const user = await UserGame.findByPk(instance.userId);
                await user.createHistory({ eventType: "DELETE_CHARACTER",
                    subject: {
                        "event_type": "DELETE_CHARACTER",
                        "triggered_character_by_user_id": instance.userId,
                        "meta": instance
                    }
                });
            }
        }
    });
    return UserGameBiodata;
};