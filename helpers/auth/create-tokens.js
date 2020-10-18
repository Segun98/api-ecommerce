const jwt = require("jsonwebtoken")


const createToken = (users) => {
    return jwt.sign({
        user_id: users.rows[0].id,
        role_id: users.rows[0].role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "59m"
    })
}

const createRefreshToken = (users) => {
    return jwt.sign({
        user_id: users.rows[0].id,
        role_id: users.rows[0].role
    }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })
}



module.exports = {
    createToken,
    createRefreshToken
}