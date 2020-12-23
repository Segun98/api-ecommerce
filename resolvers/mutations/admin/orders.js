//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {
    async completeOrder(_, {
        id
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
            await pool.query(`update orders set completed = $2, delivery_date=current_timestamp where id = $1`, [id, 'true'])
            return {
                message: "Order has been completed"
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },

    //This is for disputes
    async cancelOrderAdmin(_, {
        id
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
            //"uncomplete" an order, in case it has been completed
            await pool.query(`update orders set completed = $2 where id = $1`, [id, 'false'])
            //unaccept order, in case it has been accepted
            await pool.query(`update orders set accepted = $2 where id = $1`, [id, 'false'])
            //then cancel
            await pool.query(`update orders set canceled = $2 canceled_by = $3 where id = $1`, [id, 'true', role_id])
        } catch (err) {
            throw new Error(err.message)
        }
    }

}