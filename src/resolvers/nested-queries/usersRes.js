async function usersProducts(parent, {}, {
    pool
}) {
    try {
        const result = await pool.query(`select * from products where creator_id = $1`, [parent.id])

        return result.rows

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    usersProducts
}