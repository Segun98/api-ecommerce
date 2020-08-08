const pool = require("../../db")

/*
 Returns all users for admin dashboard
*/

async function users() {
    try {
        const res = await pool.query(`select * from users`)
        return res.rows

    } catch (err) {
        throw new Error(err.message)
    }
}

async function user(_, {
    name
}) {
    try {
        const res = await pool.query(`select * from users where name = $1`, [name])
        return res.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    users,
    user
}