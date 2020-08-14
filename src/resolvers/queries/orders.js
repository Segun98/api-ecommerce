const verifyJwt = require("../../helpers/auth/middlewares")


async function getCustomerOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    try {

    } catch (err) {
        throw new Error(err.message)
    }
}

async function getVendorOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {} catch (err) {
        throw new Error(err.message)
    }
}

//admin only
async function getAllOrders(_, {}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'admin') {
        throw new Error("unauthorised, admin only")
    }
    try {

    } catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {
    getCustomerOrders,
    getVendorOrders,
    getAllOrders
}