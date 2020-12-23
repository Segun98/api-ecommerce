const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {
    async users(_, {}, {
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
            const users = await pool.query(`select * from users order by created_at desc`)
            return users.rows

        } catch (err) {
            throw new Error(err.message)
        }
    }

}