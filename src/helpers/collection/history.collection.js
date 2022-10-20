const { Item } = require('postman-collection');
const baseURL = 'http://localhost:5000';

const header = [
    { key: 'Content-Type', value: 'application/json' },
    { key: 'cache-control', value: 'no-cache' },
    { key: 'Authorization', value: '{{token}}' }
];

const getUserCharactersHistories = {
    name: 'Get User Characters Histories',
    method: 'GET',
    url: `${baseURL}/api/histories`,
    header: header
}

module.exports = {
    requestGetUserCharactersHistories: new Item({
        name: getUserCharactersHistories.name,
        request: {
            url: getUserCharactersHistories.url,
            header: getUserCharactersHistories.header,
            method: getUserCharactersHistories.method,
            description: getUserCharactersHistories.description,
            auth: {
                type: 'bearer',
                bearer: [
                    {
                        key: 'token',
                        value: '{{token}}',
                    }
                ]
            }
        }
    })
}