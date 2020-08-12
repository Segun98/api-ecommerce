async function creator(parent, {}, {
    pool
}) {
    try {
        const result = await pool.query(`select * from users where id = $1`, [parent.creator_id])
        return result.rows[0]

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