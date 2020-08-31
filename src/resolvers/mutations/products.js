const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

async function addProduct(_, {
    name,
    name_slug,
    description,
    price,
    category,
    image,
    in_stock
}, {
    pool,
    req
}) {
    verifyJwt(req)

    // #checks for role, should only be vendor 
    if (req.payload.role_id !== 'vendor') {
        throw new Error("unauthorised")
    }

    // prevent duplicate slugs
    const slugCheck = await pool.query(`select * from products where name_slug = $1`, [name_slug])

    let random = Math.floor(Math.random() * 74353785)

    try {
        await pool.query(`insert into products     (name,
                name_slug,
                description,
                price,
                category,
                image,
                in_stock,
                creator_id) 
                values($1,$2,$3,$4,$5,$6,$7,$8)`,
            [name,
                `${slugCheck.rows.length > 0? name_slug+random : name_slug}`,
                description,
                price,
                category,
                image,
                in_stock,
                req.payload.user_id
            ])

        return {
            message: "product successfully added"
        }

    } catch (err) {
        throw new Error(err.message)
    }


}


async function updateProduct(_, {
    id,
    name,
    description,
    price,
    category,
    image,
    in_stock,
    creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.user_id !== creator_id) {
        throw new Error("unauthorised, wrong user")
    }

    try {
        await pool.query(`update products set name = $2, description = $3, price = $4, category = $5, image = $6, in_stock = $7 where id = $1`, [id, name,
            description,
            price,
            category,
            image,
            in_stock
        ])

        return {
            message: "product successfully updated"
        }

    } catch (err) {
        throw new Error(err.message)
    }
}


async function deleteProduct(_, {
    id,
    creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.user_id !== creator_id) {
        throw new Error("unauthorised, wrong user")
    }
    try {
        await pool.query(`delete from products where id = $1`, [id])

        return {
            message: "product successfully updated"
        }

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct
}