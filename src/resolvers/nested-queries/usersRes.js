async function usersProducts(parent, {}, {
    pool,
    loaderTwo
}) {
    try {
        // console.log(await loaderTwo.load("products", "creator_id", parent.id));
        // return loaderTwo.load("products", "creator_id", parent.id)

        const result = await pool.query(`select * from products where creator_id = $1`, [parent.id])
        return result.rows

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    usersProducts
}