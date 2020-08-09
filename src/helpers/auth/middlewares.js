const jwt = require('jsonwebtoken')

const verifyJwt = (req) => {
    const authorization = req.headers["authorization"]
    if (!authorization) {
        throw new Error("no authorization, you have to log in")
    }
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = payload
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = verifyJwt