/*
 first arg expects parent, second expects inputs, third - context
*/

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

async function byCategory(_, {
    category,
    limit,
    offset
}, {
    pool
}) {
    try {
        const products = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.image from products p inner join users u on p.creator_id = u.id where p.category = $1 and u.online = $2 order by p.created_at desc limit ${limit} offset ${offset}`, [category, "true"])
        return products.rows
    } catch (err) {
        throw new Error(err.message)
    }
}

async function partyCategory(_, {
    party_category,
    limit,
    offset
}, {
    pool
}) {
    try {
        const products = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.image from products p inner join users u on p.creator_id = u.id where p.party_category = $1 and u.online = $2 order by p.created_at desc limit ${limit} offset ${offset}`, [party_category, "true"])
        return products.rows
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

async function search(_, {
    query,
    limit,
    offset
}, {
    pool
}) {
    try {
        const products = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.image from products p inner join users u on p.creator_id = u.id where p.name ilike '%${query}%' and u.online = $1 order by p.created_at desc limit ${limit} offset ${offset}`, ["true"])
        return products.rows
    } catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {
    product,
    search,
    byCategory,
    partyCategory,
    editProductPage
}