//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {
    async products(_, {
        limit
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
            const users = await pool.query(`select * from products order by created_at desc limit ${limit}`)
            return users.rows

        } catch (err) {
            throw new Error(err.message)
        }
    }
}