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
        const result = await pool.query(`select * from products where category = $1`, [parent.category])
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