/*
 Returns all products and a single product
 first arg expects parent, second expects inputs, third - context
*/


async function products(_, {}, {
    pool
}) {

    try {
        const users = await pool.query(`select * from products order by created_at desc`)
        return users.rows

    } catch (err) {
        throw new Error(err.message)
    }
}

async function product(_, {
    name_slug
}, {
    pool
}) {
    try {
        const product = await pool.query(`select * from products where name_slug = $1`, [name_slug])
        return product.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}


async function editProductPage(_, {
    id
}, {
    pool
}) {
    try {
        const product = await pool.query(`select * from products where id = $1`, [id])
        return product.rows[0]
    } catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {
    product,
    products,
    editProductPage
}