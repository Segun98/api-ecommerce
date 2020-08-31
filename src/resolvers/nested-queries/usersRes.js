async function usersProducts(parent, {}, {
    pool,
    loaderTwo
}) {
    try {
        // return loaderTwo.load("products", "creator_id", parent.id)

        const result = await pool.query(`select * from products where creator_id = $1 order by created_at desc`, [parent.id])
        return result.rows

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    usersProducts
}