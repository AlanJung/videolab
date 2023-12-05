const db = require('knex')({
    client: 'pg',
    connection: 'postgresql://dev:dev@localhost/videolab',
})


module.exports = db
