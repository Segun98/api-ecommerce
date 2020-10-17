const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

async function completeOrder(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.role_id !== 'admin') {
        throw new Error("Unauthorised, admin only")
    }
    try {
        await pool.query(`update orders set completed = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been completed"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

async function cancelOrderAdmin(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'admin') {
        throw new Error("Unauthorised, admin only")
    }
    try {
        await pool.query(`update orders set canceled = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been canceled"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    completeOrder,
    cancelOrderAdmin
}