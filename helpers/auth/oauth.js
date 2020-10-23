const router = require("express").Router()
const pool = require("../../db")
const {
    createRefreshToken,
    createToken
} = require("./create-tokens")
const {
    welcomeCustomer
} = require("../emails/email_functions");
const bcrypt = require("bcryptjs")


router.post("/oauth/login", async (req, res) => {

    const {
        email
    } = req.body
    try {
        const users = await pool.query("select * from users where email = $1", [email]);

        if (users.rows.length === 0) {
            return res.send("You need to sign up before logging in")
        }

        // cookie expiry date - 7 days 
        let date = new Date()
        date.setDate(date.getDate() + 7);

        //imports to create tokens
        const token = createToken(users) //returns access token
        res.cookie('ecom', createRefreshToken(users), {
            // httpOnly: true,
            expires: date,
            // secure: true,
        })
        //role here is either customer, admin or vendor. it's determined at sign up
        res.cookie('role', users.rows[0].role, {
            expires: date,
        });

        return {
            accesstoken: token,
            role: users.rows[0].role
        }

    } catch (err) {
        throw new Error(err.message)
    }
})

router.post("/oauth/signup", async (req, res) => {

    const {
        first_name,
        last_name,
        password,
        email
    } = req.body

    try {

        const emailExists = await pool.query(`select email from users where email = $1`, [email])

        if (emailExists.rows.length > 0) {
            return res.send("Email already exists, Login")
        }
        // hash password , in this case, user id from google

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        //Password is google user id to track people signing up with google
        await pool.query(`INSERT INTO users (first_name,last_name,email,password,phone,role,pending,business_name,
                            business_name_slug,
                            business_address,
                            business_image,
                            business_bio,
                            customer_address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [first_name, last_name, email, hashedpassword, null, 'customer', 'false', null,
                null,
                null,
                null,
                null,
                null
            ]);
        await welcomeCustomer(first_name, email)
        res.send("signup successful")
    } catch (err) {
        res.send(err.message)
    }

})

// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['email', 'profile']
//     }));

// router.get("/auth/failed", (req, res) => {
//     res.send("Error Authenticating With Google")
// })


// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/auth/failed',
//         session: false
//     }),
//     async function (req, res) {
//         try {

//             //if user exists, Login
//             let users = await pool.query(`select * from users where email = $1`, [req.user.email])
//             if (users.rows.length > 0) {
//                 // cookie expiry date - 7 days 
//                 let date = new Date()
//                 date.setDate(date.getDate() + 7);
//                 const token = createToken(users) //returns access token
//                 res.cookie('ecom', createRefreshToken(users), {
//                     // httpOnly: true,
//                     expires: date,
//                     // secure: true,
//                 })
//                 //role here is either customer, admin or vendor. it's determined at sign up
//                 res.cookie('role', users.rows[0].role, {
//                     expires: date,
//                 });

//                 res.send({
//                     accesstoken: token,
//                     role: users.rows[0].role
//                 })
//             } else {
//                 //else, sign up

//                 //Password is google user id to track people signing up with google
//                 await pool.query(`INSERT INTO users (first_name,last_name,email,password,phone,role,pending,business_name,
//                 business_name_slug,
//                 business_address,
//                 business_image,
//                 business_bio,
//                 customer_address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
//                     [req.user.first_name, req.user.last_name, req.user.email, req.user.id, null, 'customer', 'false', null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null
//                     ]);
//                 await welcomeCustomer(req.user.first_name, req.user.email)
//                 res.send("signup successful")
//             }

//         } catch (err) {
//             res.send(err.message)
//         }
//     });

module.exports = router