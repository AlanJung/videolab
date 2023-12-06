const db = require('knex')({
    client: 'pg',
    connection: 'postgres://dev:9cNHZqMgWjnrzieyECxVoZHhzQohHuWM@dpg-clnrhrrj65ls738a2c5g-a.oregon-postgres.render.com/videolab?ssl=true',
})


module.exports = db
