const jwt = require("jsonwebtoken")
const router = require("express").Router()
const cookieParser = require('cookie-parser')


const createToken = (users) => {
    return jwt.sign({
        user_id: users.rows[0].id,
        email_id: users.rows[0].email,
        role_id: users.rows[0].role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

const createRefreshToken = (users) => {
    return jwt.sign({
        user_id: users.rows[0].id,
        email_id: users.rows[0].email,
        role_id: users.rows[0].role
    }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })
}

//refresh tokens before access token expires
router.post("/refreshtokens", cookieParser(), async (req, res) => {

    const token = req.cookies.yeez

    if (!token) {
        return res.status(401).send({
            success: false,
            accessToken: ""
        })
    }
    let payload = null
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET)
    } catch (err) {
        return res.status(401).send({
            success: false,
            accessToken: "",
            err
        })
    }
    // const user = await Users.findOne({
    //     _id: payload.user_id
    // })

    // if (!user) {
    //     return res.status(401).send({
    //         success: false,
    //         accessToken: ""
    //     })
    // }
    let date = new Date()
    date.setDate(date.getDate() + 7);
    res.cookie('ecom', createRefreshToken(user), {
        httpOnly: true,
        expires: date,
        secure: true
    })

    return res.status(200).send({
        success: true,
        accessToken: createToken(user)
    })

})

router.post("/logout", (req, res, next) => {
    res.clearCookie('ecom');
    res.clearCookie('role');
    next()
    return res.status(200).send({
        message: "Logged out"
    })

})



module.exports = {
    createToken,
    createRefreshToken,
    router
}