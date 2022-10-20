const { ItemGroup } = require('postman-collection');
const {
    requestRegister, requestLogin,
    requestMe, requestChangePassword, requestLogout
} = require('./auth.collection');
const {
    requestGetCharacters, requestCreateCharacter,
    requestChangeCharacterNickname, requestCharacterJoinGuild,
    requestCharacterChangeGuild, requestCharacterLeaveGuild,
    requestCharacterJoinFamily, requestCharacterChangeFamily,
    requestCharacterLeaveFamily, requestCharacterGainedExp,
    requestCharacterLevelUp, requestDeleteCharacter
} = require('./characters.collection');
const { requestGetUserCharactersHistories } = require('./history.collection');

module.exports = {
    authGroup: new ItemGroup({
        name: 'Authentication Collection Endpoint',
        description: 'Authentication API Collection',
        item: [
            requestRegister,
            requestLogin,
            requestMe,
            requestChangePassword,
            requestLogout
        ]
    }),
    charactersGroup: new ItemGroup({
        name: 'Characters Collection Endpoint',
        description: 'Characters / User Game Biodata API Collection',
        item: [
            requestGetCharacters,
            requestCreateCharacter,
            requestChangeCharacterNickname,
            requestCharacterJoinGuild,
            requestCharacterChangeGuild,
            requestCharacterLeaveGuild,
            requestCharacterJoinFamily,
            requestCharacterChangeFamily,
            requestCharacterLeaveFamily,
            requestCharacterGainedExp,
            requestCharacterLevelUp,
            requestDeleteCharacter
        ]
    }),
    historiesGroup: new ItemGroup({
        name: 'Histories Collection Endpoint',
        description: 'Histories / User Game History API Collection',
        item: [
            requestGetUserCharactersHistories
        ]
    })
}