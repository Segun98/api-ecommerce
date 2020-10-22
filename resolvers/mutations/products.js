//@ts-check
const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

/** 
* @param {any} _
* @param {Object} obj -an object
* @param {String} obj.name
* @param {String} obj.name_slug
* @param {String} obj.description
* @param {String} obj.price
* @param {String} obj.category
* @param {String} obj.party_category
* @param {String} obj.image
* @param {number} obj.available_qty
* @param {number} obj.stk
  @param{any} pool
*/
async function addProduct(_, {
    name,
    name_slug,
    description,
    price,
    category,
    party_category,
    image,
    available_qty
}, {
    pool,
    req
}) {
    verifyJwt(req)
    // #checks for role, should only be vendor 
    if (req.payload.role_id !== 'vendor') {
        throw new Error("Unauthorised")
    }

    // prevent duplicate slugs
    const slugCheck = await pool.query(`select * from products where name_slug = $1`, [name_slug])

    let random = Math.floor(Math.random() * 4935)

    try {
        await pool.query(`
                insert into products     
                (name,
                name_slug,
                description,
                price,
                category,
                party_category,
                image,
                available_qty,
                creator_id) 
                values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [name,
                `${slugCheck.rows.length > 0? name_slug+random : name_slug}`,
                description,
                price,
                category,
                party_category,
                image,
                available_qty,
                req.payload.user_id
            ])

        return {
            message: "Product successfully added"
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
    party_category,
    image,
    in_stock,
    available_qty,
    creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.user_id !== creator_id) {
        throw new Error("Unauthorised, wrong user")
    }

    try {
        await pool.query(`update products set name = $2, description = $3, price = $4, category = $5,party_category=$6, image = $7, in_stock = $8, available_qty=$9 where id = $1`, [id, name,
            description,
            price,
            category,
            party_category,
            image,
            in_stock,
            available_qty
        ])

        return {
            message: "Product successfully updated"
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
        throw new Error("Unauthorised, wrong user")
    }
    try {
        await pool.query(`delete from products where id = $1`, [id])

        return {
            message: "Product successfully deleted"
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