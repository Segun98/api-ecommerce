//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")

// record completed orders by each vendor in the users table, the point is to display products on the site according to vendors with the highest completed orders
async function updateCompleted(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {
        //fetch a vendor's completed orders
        const completed_orders = await pool.query(`select completed, vendor_email from orders where completed = $2 and prod_creator_id= $1`, [id, 'true'])
        //get the length
        let completed_orders_length = completed_orders.rows.length
        //update users table with the length
        await pool.query(`update users set completed_qty = $2 where id = $1`, [id, completed_orders_length])
    } catch (err) {
        throw new Error(err.message)
    }
}


module.exports = {
    updateCompleted
}