const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

//fetch all cart items of a customer via token payload


module.exports = {
    async getCartItems(_, {
        customer_id
    }, {
        pool
    }) {

        try {

            const cart = await pool.query(`select * from cart where customer_id = $1 order by created_at desc`, [customer_id])

            return cart.rows

        } catch (err) {
            throw new Error(err.message)
        }
    },

}