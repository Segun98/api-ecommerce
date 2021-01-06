//@ts-check
const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

module.exports = {
    async getCustomerOrders(_, {}, {
        pool,
        req
    }) {
        verifyJwt(req)
        if (req.payload.role_id !== 'customer') {
            throw new Error("Unauthorised")
        }
        try {
            const result = await pool.query(`SELECT * from orders o INNER JOIN order_status os ON os.order_id = o.order_id WHERE o.customer_id = $1 and os.paid = $2 ORDER BY o.created_at DESC`, [req.payload.user_id, 'true'])
            return result.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async getVendorOrders(_, {
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
            const orders = await pool.query(`SELECT * from orders o INNER JOIN order_status os ON os.order_id = o.order_id WHERE o.prod_creator_id = $1 and os.paid = $2 ORDER BY o.created_at DESC LIMIT ${limit}`, [req.payload.user_id, 'true'])
            return orders.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    //pay page for customer
    async getOrder(_, {
        order_id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        try {
            const order = await pool.query(`select * from orders where order_id = $1`, [order_id])
            return order.rows

        } catch (err) {
            throw new Error(err.message)
        }

    }

}