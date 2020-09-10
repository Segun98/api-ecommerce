const {
    verifyJwt,
    verifyStore
} = require("../../helpers/auth/middlewares");

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


//public profile
async function user(_, {
    business_name_slug
}, {
    pool,
    req
}) {
    verifyStore(req)
    let id = req.payload && req.payload.user_id
    try {
        const users = await pool.query(`select * from users where business_name_slug = $1`, [business_name_slug])
        return {
            ...users.rows[0],
            jwt_user_id: id
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

//gets user by id
async function getUser(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    try {
        const user = await pool.query(`select * from users where id = $1`, [req.payload.user_id])
        return user.rows[0]

    } catch (err) {
        throw new Error(err.message)
    }
}

async function editUserPage(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.role_id !== "vendor") {
        throw new Error("unauthorised, you are not a vendor")
    }
    try {
        const users = await pool.query(`select * from users where id = $1`, [id])
        return users.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}


//customer profile. /customer/profile
async function customerProfile(_, {}, {
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
    user,
    getUser,
    editUserPage,
    customerProfile
}