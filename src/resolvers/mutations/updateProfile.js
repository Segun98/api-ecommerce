const verifyJwt = require('../../helpers/auth/middlewares')

module.exports = async (_, {
    first_name,
    last_name,
    phone,
    business_name,
    business_address,
    business_area,
    business_image,
    business_bio,
    customer_address
}, {
    pool,
    req
}) => {
    verifyJwt(req)

    try {
        await pool.query(`update users set first_name = $2,
        last_name = $3,
        phone = $4,
        business_name = $5,
        business_address = $6,
        business_area = $7,
        business_image = $8,
        business_bio = $9,
        customer_address = $10  where id = $1`,
            [req.payload.user_id, first_name, last_name,
                phone, business_name, business_address, business_area,
                business_image, business_bio, customer_address
            ])

        return {
            message: "user successfully updated"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}