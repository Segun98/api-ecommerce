const router = require("express").Router()
const pool = require("../../db")
const {
    createRefreshToken,
    createToken
} = require("./create-tokens")
const passport = require('passport');
const {
    welcomeCustomer
} = require("../emails/email_functions");
const bcrypt = require("bcryptjs")


router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

router.get("/auth/failed", (req, res) => {
    res.send("Error Authenticating With Google")
})


router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failed',
        session: false
    }),
    async function (req, res) {
        try {

            //if user exists, Login
            let users = await pool.query(`select * from users where email = $1`, [req.user.email])
            if (users.rows.length > 0) {
                // cookie expiry date - 7 days 
                let date = new Date()
                date.setDate(date.getDate() + 7);
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

                res.send({
                    accesstoken: token,
                    role: users.rows[0].role
                })
            } else {
                //else, sign up

                //Password is google user id to track people signing up with google
                await pool.query(`INSERT INTO users (first_name,last_name,email,password,phone,role,pending,business_name,
                business_name_slug,
                business_address,
                business_image,
                business_bio,
                customer_address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                    [req.user.first_name, req.user.last_name, req.user.email, req.user.id, null, 'customer', 'false', null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ]);
                await welcomeCustomer(req.user.first_name, req.user.email)
                res.send("signup successful")
            }

        } catch (err) {
            res.send(err.message)
        }
    });

module.exports = router