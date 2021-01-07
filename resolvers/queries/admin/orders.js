//@ts-check

const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {
    async getAllOrders(_, {}, {
        pool,
        req
    }) {
        verifyJwt(req)
        const {
            role_id
        } = req.payload

        if (!(role_id === "admin" || role_id === "super_admin")) {
            throw new Error("Unauthorised, you are not an admin")
        }
        try {
            const result = await pool.query(`SELECT * from orders ORDER BY created_at desc`)
            return result.rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    async getOrderStatus(_, {}, {
        pool,
        req
    }) {
        verifyJwt(req)
        const {
            role_id
        } = req.payload

        if (!(role_id === "admin" || role_id === "super_admin")) {
            throw new Error("Unauthorised, you are not an admin")
        }
        try {
            const result = await pool.query(`select * from order_status where paid = $1 order by created_at desc`, ['true'])
            return result.rows
        } catch (err) {
            throw new Error(err.message)
        }

    }
}