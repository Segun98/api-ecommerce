const {
    verifyJwt
} = require('../../helpers/auth/middlewares')

async function updateProfile(_, {
    first_name,
    last_name,
    phone,
    business_name,
    business_address,
    business_image,
    business_bio,
    customer_address,
    online
}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {
        await pool.query(`update users set first_name = $2,
        last_name = $3,
        phone = $4,
        business_name = $5,
        business_address = $6,
        business_image = $7,
        business_bio = $8,
        customer_address = $9, online = $10 where id = $1`,
            [req.payload.user_id, first_name, last_name,
                phone, business_name, business_address,
                business_image, business_bio, customer_address, online
            ])

        return {
            message: "User successfully updated"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}



module.exports = {
    updateProfile
}