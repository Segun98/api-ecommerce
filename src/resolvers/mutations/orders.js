const verifyJwt = require("../../helpers/auth/middlewares")

async function createOrder(_, {

}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {

    } catch (err) {
        throw new Error(err.message)
    }


}

//set to completed , or cancel
async function updateOrder(_, {

}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {

    } catch (err) {
        throw new Error(err.message)
    }
}



module.exports = {
    createOrder,
    updateOrder
}