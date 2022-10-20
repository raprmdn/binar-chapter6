const { Collection } = require('postman-collection');
const fs = require('fs');
const { authGroup, charactersGroup, historiesGroup } = require('../helpers/collection/request.collection');

const postmanCollection = new Collection({
    info: {
        name: 'Binar Challenge - ExpressJS RESTful API CRUD - Postman Collection - Chapter 5',
        version: '1.0.0',
        description: 'Postman Collection API Documentation',
    },
    item: [
        authGroup,
        charactersGroup,
        historiesGroup
    ]
});

const collectionJSON = postmanCollection.toJSON();

fs.writeFile('./collection.json', JSON.stringify(collectionJSON, null, 2), (err) => {
    if (err) { console.log(err); }
    console.log('Collection generated successfully.');
});