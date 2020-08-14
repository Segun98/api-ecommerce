const verifyJwt = require("../../helpers/auth/middlewares")

//fetch all cart items of a customer via token payload

async function getCartItems(_, {}, {
    pool,
    req
}) {
    try {
        verifyJwt(req)

        const cart = await pool.query(`select * from cart where customer_id = $1`, [req.payload.user_id])

        return cart.rows

    } catch (err) {
        throw new Error(err.message)
    }
}


//gets a single cart item that was clicked for checkout. this is order page
async function getCart(_, {
    id
}, {
    pool,
    req
}) {
    try {
        verifyJwt(req)

        const cart = await pool.query(`select * from cart where id = $1`, [id])

        return cart.rows[0]

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    getCartItems,
    getCart
}