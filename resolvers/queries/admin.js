const {
    verifyJwt
} = require("../../helpers/auth/middlewares")


async function users(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== "admin") {
        throw new Error("Unauthorised, you are not an admin")
    }
    try {
        const users = await pool.query(`select * from users order by created_at desc`)
        return users.rows

    } catch (err) {
        throw new Error(err.message)
    }
}


async function products(_, {
    limit
}, {
    pool
}) {
    // verifyJwt(req)
    // if (req.payload.role_id !== 'admin') {
    //     throw new Error("Unauthorised, admin only")
    // }
    try {
        const start = Date.now()
        const users = await pool.query(`select * from products order by created_at desc limit ${limit}`)
        console.log(Date.now() - start);
        return users.rows

    } catch (err) {
        throw new Error(err.message)
    }
}


async function getAllOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'admin') {
        throw new Error("Unauthorised, admin only")
    }
    try {
        const result = await pool.query(`select * from orders`)
        return result.rows
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    getAllOrders,
    users,
    products
}