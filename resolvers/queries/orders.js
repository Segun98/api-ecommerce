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
            const result = await pool.query(`select * from orders where customer_id = $1 and paid = $2 order by created_at desc`, [req.payload.user_id, 'true'])
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
            const orders = await pool.query(`select * from orders where prod_creator_id = $1 and paid = $2 order by created_at desc limit ${limit}`, [req.payload.user_id, 'true'])
            return orders.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    //pay page for customer
    async getOrder(_, {
        id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        try {
            const order = await pool.query(`select * from orders where id = $1`, [id])
            return order.rows[0]

        } catch (err) {
            throw new Error(err.message)
        }

    }

}