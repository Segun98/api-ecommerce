const pool = require('../../db')

module.exports = async (_, {
    name,
    email,
    password,
    role,
    phone,
    pending
}) => {
    try {
        const res = await pool.query("INSERT INTO users (name,email,password,phone,role,pending) VALUES($1, $2, $3, $4, $5,$6) RETURNING * ", [name, email, password, phone, role, pending]);

        return res.rows[0]

    } catch (err) {
        throw new Error(err.message)
    }

}