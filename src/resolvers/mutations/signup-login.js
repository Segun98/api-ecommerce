const {
    registerValidation
} = require("../../helpers/auth/joivalidate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
    createRefreshToken,
    createToken
} = require("../../helpers/auth/create-tokens")

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

        return {
            message: "sign up successful"
        }

    } catch (err) {
        throw new Error(err.message)
    }

}

async function logIn(_, {
    email,
    password
}, {
    res,
    pool
}) {
    try {
        const users = await pool.query("select * from users where email = $1", [email]);

        if (users.rows.length === 0) {
            throw new Error("wrong email or password")
        }
        const validPass = await bcrypt.compare(password, users.rows[0].password)
        if (!validPass) {
            throw new Error("wrong email or password")
        }

        // cookie expiry date - 7 days 
        let date = new Date()
        date.setDate(date.getDate() + 7);

        //imports to create tokens
        const token = createToken(users) //returns access token
        res.cookie('ecom', createRefreshToken(users), {
            httpOnly: true,
            expires: date,
            // secure: true
        })

        res.cookie('role', users.rows[0].role, {
            httpOnly: true,
            expires: date,
            // secure: true
        });

        return {
            accesstoken: token,
            role: users.rows[0].role
        }

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    signUp,
    logIn
}