const { Item } = require('postman-collection');
const baseURL = 'http://localhost:5000';

const header = [
    { key: 'Content-Type', value: 'application/json' },
    { key: 'cache-control', value: 'no-cache' },
    { key: 'Authorization', value: '{{token}}' }
];

const auth = {
    type: 'bearer',
    bearer: [
        {
            key: 'token',
            value: '{{token}}',
        }
    ]
};

const customURL = (path) => {
   return {
       protocol: 'http',
       port: process.env.PORT || 5000,
       path: [ 'api', 'characters', ':nickname', path ],
       host: [ 'localhost' ],
       variable: [
           {
               type: 'any',
               key: 'nickname',
               value: 'raprmdn'
           }
       ]
   }
};

const getCharacters = {
    name: 'Get User Characters',
    method: 'GET',
    url: `${baseURL}/api/characters`,
    header: header
};

const createCharacter = {
    name: 'Create Character',
    method: 'POST',
    url: `${baseURL}/api/characters`,
    header: header,
    payload: {
        nickname: 'raprmdn',
        race: 'Human',
        type: 'Fighter',
        gender: 'Male'
    }
};

const changeCharacterNickname = {
    name: 'Change Character Nickname',
    method: 'PATCH',
    url: customURL('change-nickname'),
    header: header,
    payload: {
        id: 1,
        nickname: 'raprmdn'
    }
};

const characterJoinGuild = {
    name: 'Character Join Guild',
    method: 'PATCH',
    url: customURL('join-guild'),
    header: header,
    payload: {
        id: 1,
        guild: 'MixMax'
    }
};

const characterChangeGuild = {
    name: 'Character Change Guild',
    method: 'PATCH',
    url: customURL('change-guild'),
    header: header,
    payload: {
        id: 1,
        guild: 'Coalition'
    }
};

const characterLeaveGuild = {
    name: 'Character Leave Guild',
    method: 'DELETE',
    url: customURL('leave-guild'),
    header: header
};

const characterJoinFamily = {
    name: 'Character Join Family',
    method: 'PATCH',
    url: customURL('join-family'),
    header: header,
    payload: {
        id: 1,
        family: 'Ragnarok'
    }
};

const characterChangeFamily = {
    name: 'Character Change Family',
    method: 'PATCH',
    url: customURL('change-family'),
    header: header,
    payload: {
        id: 1,
        family: 'Crusade'
    }
};

const characterLeaveFamily = {
    name: 'Character Leave Family',
    method: 'DELETE',
    url: customURL('leave-family'),
    header: header
};

const characterGainedExp = {
    name: 'Character Gained Exp',
    method: 'PATCH',
    url: customURL('gained-exp'),
    header: header,
    payload: {
        id: 1,
        gained_exp: 35000
    }
};

const characterLevelUp = {
    name: 'Character Level Up',
    method: 'PATCH',
    url: customURL('level-up'),
    header: header
};

const deleteCharacter = {
    name: 'User Delete Character',
    method: 'DELETE',
    url: customURL('delete-character'),
    header: header
};

module.exports = {
    requestGetCharacters: new Item({
        name: getCharacters.name,
        request: {
            url: getCharacters.url,
            header: getCharacters.header,
            method: getCharacters.method,
            description: getCharacters.name,
            auth: auth
        }
    }),
    requestCreateCharacter: new Item({
        name: createCharacter.name,
        request: {
            url: createCharacter.url,
            header: createCharacter.header,
            method: createCharacter.method,
            description: createCharacter.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(createCharacter.payload)
            },
            auth: auth
        }
    }),
    requestChangeCharacterNickname: new Item({
        name: changeCharacterNickname.name,
        request: {
            url: changeCharacterNickname.url,
            header: changeCharacterNickname.header,
            method: changeCharacterNickname.method,
            description: changeCharacterNickname.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(changeCharacterNickname.payload)
            },
            auth: auth
        }
    }),
    requestCharacterJoinGuild: new Item({
        name: characterJoinGuild.name,
        request: {
            url: characterJoinGuild.url,
            header: characterJoinGuild.header,
            method: characterJoinGuild.method,
            description: characterJoinGuild.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(characterJoinGuild.payload)
            },
            auth: auth
        }
    }),
    requestCharacterChangeGuild: new Item({
        name: characterChangeGuild.name,
        request: {
            url: characterChangeGuild.url,
            header: characterChangeGuild.header,
            method: characterChangeGuild.method,
            description: characterChangeGuild.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(characterChangeGuild.payload)
            },
            auth: auth
        }
    }),
    requestCharacterLeaveGuild: new Item({
        name: characterLeaveGuild.name,
        request: {
            url: characterLeaveGuild.url,
            header: characterLeaveGuild.header,
            method: characterLeaveGuild.method,
            description: characterLeaveGuild.name,
            auth: auth
        }
    }),
    requestCharacterJoinFamily: new Item({
        name: characterJoinFamily.name,
        request: {
            url: characterJoinFamily.url,
            header: characterJoinFamily.header,
            method: characterJoinFamily.method,
            description: characterJoinFamily.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(characterJoinFamily.payload)
            },
            auth: auth
        }
    }),
    requestCharacterChangeFamily: new Item({
        name: characterChangeFamily.name,
        request: {
            url: characterChangeFamily.url,
            header: characterChangeFamily.header,
            method: characterChangeFamily.method,
            description: characterChangeFamily.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(characterChangeFamily.payload)
            },
            auth: auth
        }
    }),
    requestCharacterLeaveFamily: new Item({
        name: characterLeaveFamily.name,
        request: {
            url: characterLeaveFamily.url,
            header: characterLeaveFamily.header,
            method: characterLeaveFamily.method,
            description: characterLeaveFamily.name,
            auth: auth
        }
    }),
    requestCharacterGainedExp: new Item({
        name: characterGainedExp.name,
        request: {
            url: characterGainedExp.url,
            header: characterGainedExp.header,
            method: characterGainedExp.method,
            description: characterGainedExp.name,
            body: {
                mode: 'raw',
                raw: JSON.stringify(characterGainedExp.payload)
            },
            auth: auth
        }
    }),
    requestCharacterLevelUp: new Item({
        name: characterLevelUp.name,
        request: {
            url: characterLevelUp.url,
            header: characterLevelUp.header,
            method: characterLevelUp.method,
            description: characterLevelUp.name,
            auth: auth
        }
    }),
    requestDeleteCharacter: new Item({
        name: deleteCharacter.name,
        request: {
            url: deleteCharacter.url,
            header: deleteCharacter.header,
            method: deleteCharacter.method,
            description: deleteCharacter.name,
            auth: auth
        }
    })
}