const verifyJwt = require("../../helpers/auth/middlewares");

/*
 Returns all users for admin dashboard
 first arg expects parent, second expects inputs, third - context
*/


async function users(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.role_id !== "admin") {
        throw new Error("unauthorised, you are not an admin")
    }
    try {
        const users = await pool.query(`select * from users order by created_at desc`)
        return users.rows

    } catch (err) {
        throw new Error(err.message)
    }
}

async function user(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    try {
        const users = await pool.query(`select * from users where id = $1`, [req.payload.user_id])
        return users.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    users,
    user
}