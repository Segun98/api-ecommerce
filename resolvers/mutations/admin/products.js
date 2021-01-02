// @ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")

module.exports = {
    async setFeatured(_, {
        id,
        featured
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
        let status = featured === "true" ? "false" : "true"

        try {
            await pool.query(`update products set featured = $2 where id = $1`, [id, status])
            return {
                message: "product featured status updated!"
            }
        } catch (err) {
            throw new Error(err.message)
        }

    },

    async deleteProductAdmin(_, {
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
            await pool.query(`delete from products where id = $1`, [id])

            return {
                message: "Product successfully deleted"
            }

        } catch (err) {
            throw new Error(err.message)
        }

    },

    async setOutOfStock(_, {
        id,
        in_stock
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
        let instock = in_stock === "true" ? "false" : "true"

        try {
            await pool.query(`update products set in_stock = $2 where id = $1`, [id, instock])

            return {
                message: "Item stock status updated!"
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
}