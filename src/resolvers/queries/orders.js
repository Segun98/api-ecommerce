const verifyJwt = require("../../helpers/auth/middlewares")


async function getCustomerOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'customer') {
        throw new Error("unauthorised")
    }
    try {
        const result = await pool.query(`select * from orders where customer_id = $1`, [req.payload.user_id])
        return result.rows
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getVendorOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'vendor') {
        throw new Error("unauthorised")
    }
    try {
        const result = await pool.query(`select * from orders where prod_creator_id = $1`, [req.payload.user_id])
        return result.rows
    } catch (err) {
        throw new Error(err.message)
    }
}

//admin only
async function getAllOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'admin') {
        throw new Error("unauthorised, admin only")
    }
    try {
        const result = await pool.query(`select * from orders`)
        return result.rows
    } catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {
    getCustomerOrders,
    getVendorOrders,
    getAllOrders
}