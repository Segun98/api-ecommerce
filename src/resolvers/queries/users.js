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

async function user(_, {
    business_name_slug
}, {
    pool
}) {
    try {
        const users = await pool.query(`select * from users where business_name_slug = $1`, [business_name_slug])
        return users.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    users,
    user
}