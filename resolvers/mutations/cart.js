const {
    verifyJwt
} = require("../../helpers/auth/middlewares");


module.exports = {
    async addToCart(_, {
        customer_id,
        product_id,
        prod_creator_id,
        quantity
    }, {
        pool
    }) {

        //checks if item exists. I cant write "where product_id..." cos table contains everyone's cart
        const product = await pool.query(`select product_id from cart where customer_id = $1`, [customer_id])
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
                customer_id
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
        pool
    }) {

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
        pool
    }) {

        try {
            await pool.query(`update cart set quantity = $2 where id = $1`, [id, quantity])

            return {
                message: "Quantity successfully updated"
            }

        } catch (err) {
            throw new Error(err.message)
        }
    },

    //After successfull payment
    async deleteAllFromCart(_, {
        customer_id
    }, {
        pool
    }) {

        try {

            await pool.query(`delete from cart where customer_id = $1`, [customer_id])

            return {
                message: "Cart cleared!"
            }

        } catch (err) {
            throw new Error(err.message)
        }

    },

}