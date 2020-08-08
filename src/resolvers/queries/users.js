const pool = require("../../db")

async function users() {
    try {
        const res = await pool.query("select * from users")
        return res.rows

    } catch (err) {
        throw new Error(err.message)
    }
}

function user(_, {
    name
}) {
    return {
        name
    }
}

module.exports = {
    users,
    user
}