const {
    verifyJwt
} = require("../../helpers/auth/middlewares");


module.exports = {
    async addToCart(_, {
        product_id,
        prod_creator_id,
        quantity
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        if (req.payload.role_id !== "customer") {
            throw new Error("You need to login as a customer")
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
            quantity,
            customer_id) values($1,$2,$3,$4)`, [
                product_id,
                prod_creator_id,
                quantity,
                req.payload.user_id,
            ])

            return {
                message: "Item has been added to cart"
            }

        } catch (err) {
            throw new Error(err.message)
        }

    },

    async deleteFromCart(_, {
        id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)

        try {

            await pool.query(`delete from cart where id = $1`, [id])

            return {
                message: "Item has been removed from cart"
            }

        } catch (err) {
            throw new Error(err.message)
        }

    },


    async updateCart(_, {
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
                message: "Quantity successfully updated"
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }

}