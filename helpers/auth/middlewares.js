const jwt = require('jsonwebtoken')

const verifyJwt = (req) => {
    const authorization = req.headers["authorization"]
    if (!authorization) {
        throw new Error("You have to Log In")
    }
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = payload
    } catch (err) {
        // console.log(err.message);
        throw new Error(err.message)
    }
}

//an helper to verify if a person who visits the public store page is the owner of the store, hence enabling them edit or add to their products
const verifyStore = (req) => {
    const authorization = req.headers["authorization"]
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.REFRESH_SECRET)
        req.payload = payload
    } catch (err) {
        req.payload = err.message
    }
}

module.exports = {
    verifyJwt,
    verifyStore
}