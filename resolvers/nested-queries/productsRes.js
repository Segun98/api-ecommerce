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
        const result = await pool.query(`select p.id, p.name, p.name_slug, p.price, p.images from products p inner join users u on p.creator_id = u.id where p.category = $1 order by u.completed_qty desc limit 8`, [parent.category])
        //remember to filter out duplicate store ownwesr
        return result.rows

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    creator,
    related
}