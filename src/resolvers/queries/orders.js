const {
    verifyJwt
} = require("../../helpers/auth/middlewares")


async function getCustomerOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'customer') {
        throw new Error("Unauthorised")
    }
    try {
        const result = await pool.query(`select * from orders where customer_id = $1 order by created_at desc`, [req.payload.user_id])
        return result.rows
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getVendorOrders(_, {
    limit
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'vendor') {
        throw new Error("Unauthorised")
    }
    try {
        const orders = await pool.query(`select * from orders where prod_creator_id = $1 order by created_at desc limit ${limit}`, [req.payload.user_id])
        return orders.rows
    } catch (err) {
        throw new Error(err.message)
    }
}


module.exports = {
    getCustomerOrders,
    getVendorOrders
}