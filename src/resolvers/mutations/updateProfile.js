const {
    verifyJwt
} = require('../../helpers/auth/middlewares')

async function updateProfile(_, {
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
}) {
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
            message: "User successfully updated"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

//admin only. To set pending to true after reviewing a vendor's profile
async function setUserStatus(_, {
    id,
    pending
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.role_id !== 'admin') {
        throw new Error("Unauthorised")
    }

    try {
        await pool.query(`update users set pending = $2
          where id = $1`,
            [id, pending])

        return {
            message: "User successfully updated"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    updateProfile,
    setUserStatus
}