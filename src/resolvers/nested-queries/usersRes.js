async function usersProducts(parent, {}, {
    pool,
    loaderTwo
}) {
    try {
        // console.log(parent.id);
        // let test = await loaderTwo.load("products", "creator_id", parent.id)
        // console.log("Datloader: ");
        // console.log(test[0]);
        // return test[0]
        const result = await pool.query(`select * from products where creator_id = $1 order by created_at desc`, [parent.id])
        // console.log("Proper: ");
        // console.log(result.rows);
        return result.rows

    } catch (err) {
        // console.log(err);
        throw new Error(err.message)
    }

}

module.exports = {
    usersProducts
}