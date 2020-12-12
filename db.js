const {
    Pool
} = require('pg')

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})

// const pool = new Pool({
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE
// })
module.exports = pool