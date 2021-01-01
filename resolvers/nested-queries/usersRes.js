async function usersProducts(parent, {}, {
    loaderTwo
}) {
    try {
        if (!parent.id) {
            throw new Error("404")
        }
        let products = await loaderTwo.load("products", "creator_id", parent.id)
        return products

        // const result = await pool.query(`select * from products where creator_id = $1 order by created_at desc`, [parent.id])
        // return result.rows

    } catch (err) {
        // console.log(err);
        throw new Error(err.message)
    }

}
async function customerOrders(parent, {}, {
    loaderTwo
}) {
    try {
        if (!parent.id) {
            throw new Error("404")
        }
        let orders = await loaderTwo.load("orders", "customer_id", parent.id)
        return orders

    } catch (err) {
        throw new Error(err.message)
    }

}

module.exports = {
    usersProducts,
    customerOrders
}