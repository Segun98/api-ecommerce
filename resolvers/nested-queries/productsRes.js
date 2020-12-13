async function creator(parent, {}, {
    loaderOne
}) {
    try {
        return loaderOne.load("users", "id", parent.creator_id)
    } catch (err) {
        throw new Error(err.message)
    }

}

//get related products
async function related(parent, {}, {
    pool
}) {
    try {
        const result = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.images from products p inner join users u on p.creator_id = u.id where p.category = $1 and p.available_qty > 0 and p.in_stock = $2 and u.online = $2 order by u.completed_qty desc limit 8`, [parent.category, "true"])

        //remember to filter out duplicate store owners
        return result.rows

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    creator,
    related
}