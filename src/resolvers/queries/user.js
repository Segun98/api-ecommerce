const db = require("../../db")

module.exports = (_, {
    name
}) => {
    const res = db.filter(u => u.name === name);
    return res
}