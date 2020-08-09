const {
    registerValidation
} = require("../../helpers/auth/joivalidate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/*
 Returns all users for admin dashboard.

 in all functions/mutations, first arg expects parent, second expects inputs, third - context
*/
async function signUp(_, {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    role,
    phone,
    pending
}, {
    pool
}) {
    try {
        const validation = registerValidation({
            first_name,
            last_name,
            email,
            password,
            confirm_password
        })

        if (validation.error) {
            throw new Error(validation.error.message)
        }

        const emailExists = await pool.query(`select email from users where email = $1`, [email])

        if (emailExists.rows.length > 0) {
            throw new Error("email already exists")
        }

        // hash password 

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        // Signing up a user 
        const res = await pool.query("INSERT INTO users (first_name,last_name,email,password,phone,role,pending) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING * ", [first_name, last_name, email, hashedpassword, phone, role, pending]);

        return res.rows[0]

    } catch (err) {
        throw new Error(err.message)
    }

}

async function logIn(_, {
    email,
    password,
    role
}, {
    pool
}) {
    try {
        const res = await pool.query("select * from users where email = $1", [email]);

        if (res.rows.length === 0) {
            throw new Error("wrong email or password")
        }
        const validPass = await bcrypt.compare(password, res.rows[0].password)
        if (!validPass) {
            throw new Error("wrong email or password")
        }
        return {
            message: email,
            accesstoken: 'wbhkwbhxkwbhxsbxhksbxhkswbhk',
            role
        }

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    signUp,
    logIn
}