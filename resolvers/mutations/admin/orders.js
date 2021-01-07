//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {

    async setInTransit(_, {
        order_id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        const {
            role_id
        } = req.payload

        if (!(role_id === "admin" || role_id === "super_admin")) {
            throw new Error("Unauthorised, admin only")
        }
        try {
            await pool.query(`update order_status set in_transit=$2 where order_id = $1`, [order_id, 'true'])

            return {
                message: "Order is in transit!"
            }

        } catch (err) {
            throw new Error(err.message)
        }
    },

    async completeOrder(_, {
        order_id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        const {
            role_id
        } = req.payload

        if (!(role_id === "admin" || role_id === "super_admin")) {
            throw new Error("Unauthorised, admin only")
        }
        try {
            await pool.query(`update order_status set delivered = $2, delivery_date=current_timestamp, in_transit=$3 where order_id = $1`, [order_id, 'true', 'false', ])
            return {
                message: "Order has been completed"
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },

    //This is for disputes
    async cancelOrderAdmin(_, {
        order_id,
        canceled_reason
    }, {
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
            //note, don't set paid to false
            await pool.query(`update order_status set delivered = $2, in_transit = $2, canceled = $3, canceled_reason = $4 where order_id = $1`, [order_id, 'false', 'true', canceled_reason])
        } catch (err) {
            throw new Error(err.message)
        }
    }

}