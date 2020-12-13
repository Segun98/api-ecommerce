const {
    Pool
} = require('pg')

const prodConnection = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})

const devConnection = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})
module.exports = process.env.NODE_ENV === "production" ? prodConnection : devConnection