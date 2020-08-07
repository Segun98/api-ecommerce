const db = require("../../db")

module.exports = (_, {
    name,
    email,
    password,
    role,
    pending
}) => {
    db.push({
        name,
        email,
        password,
        role,
        pending
    })

}