//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")

async function completeOrder(_, {
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

//This is for disputes
async function cancelOrderAdmin(_, {
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
        //unaccept order, in case it has been accepted
        await pool.query(`update orders set accepted = $2 where id = $1`, [id, 'false'])
        //then cancel
        await pool.query(`update orders set canceled = $2 where id = $1`, [id, 'true'])
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    completeOrder,
    cancelOrderAdmin
}