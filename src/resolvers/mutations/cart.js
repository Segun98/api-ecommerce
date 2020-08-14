const verifyJwt = require("../../helpers/auth/middlewares");

async function addToCart(_, {
    name,
    price,
    quantity,
    delivery_fee,
    description,
    product_id,
    prod_creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {

        await pool.query(`insert into cart (price,
            quantity,
            delivery_fee,
            description,
            product_id,
            prod_creator_id,
            customer_id, name) values($1,$2,$3,$4,$5,$6,$7, $8)`, [price,
            quantity,
            delivery_fee,
            description,
            product_id,
            prod_creator_id,
            req.payload.user_id,
            name
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
    pool
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