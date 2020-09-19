const jwt = require("jsonwebtoken")
const router = require("express").Router()
const cookieParser = require('cookie-parser')
const pool = require("../../db")
const {
    createRefreshToken,
    createToken
} = require("./create-tokens")

//refresh token before access token expires
router.post("/refreshtoken", cookieParser(), async (req, res) => {

    //token from header
    const token = req.cookies.ecom

    if (!token) {
        return res.status(401).send({
            accessToken: ""
        })
    }

    let payload = null
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET) //returns token
    } catch (err) {
        return res.status(401).send({
            accessToken: "",
            err
        })
    }

    //last check for user
    const user = await pool.query("select * from users where id = $1", [payload.user_id]);
    if (user.rows.length === 0) {
        return res.status(401).send({
            accessToken: ""
        })
    }


    let date = new Date()
    date.setDate(date.getDate() + 7); //7 days

    //sent back cookies
    res.cookie('ecom', createRefreshToken(user), {
        httpOnly: true,
        expires: date,
        // secure: true
    })

    res.cookie('role', user.rows[0].role, {
        expires: date,
    });

    //sends a new access token
    return res.status(200).send({
        accessToken: createToken(user),
        role: user.rows[0].role
    })

})

router.post("/logout", (req, res, next) => {
    try {
        res.clearCookie("ecom");
        res.clearCookie("role");
        next()
        res.send("Logged Out")
    } catch (err) {
        console.log(err);
    }
})



module.exports = router