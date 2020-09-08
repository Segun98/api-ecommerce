const {
    verifyJwt
} = require("../../helpers/auth/middlewares");

async function addToCart(_, {
    product_id,
    prod_creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== "customer") {
        throw new Error("you need to login as a customer")
    }

    //checks if item exists. I cant write "where product_id..." cos table contains everyone's cart
    const product = await pool.query(`select product_id from cart where customer_id = $1`, [req.payload.user_id])
    product.rows.forEach(p => {
        if (p.product_id === product_id) {
            throw new Error("Item is already in Cart")
        }
    })

    try {

        await pool.query(`insert into cart (
            product_id,
            prod_creator_id,
            customer_id) values($1,$2,$3)`, [
            product_id,
            prod_creator_id,
            req.payload.user_id,
        ])

        return {
            message: "item has been added to cart"
        }

    } catch (err) {
        throw new Error(err.message)
    }

}

async function deleteFromCart(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {

        await pool.query(`delete from cart where id = $1`, [id])

        return {
            message: "item has been removed from cart"
        }

    } catch (err) {
        throw new Error(err.message)
    }

}


async function updateCart(_, {
    id,
    quantity
}, {
    pool,
    req
}) {
    verifyJwt(req)
    try {
        await pool.query(`update cart set quantity = $2 where id = $1`, [id, quantity])

        return {
            message: "quantity successfully updated"
        }

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    addToCart,
    deleteFromCart,
    updateCart
}