//@ts-check
const {
    verifyJwt
} = require("../../../helpers/auth/middlewares")


module.exports = {

    // record completed orders by each vendor in the users table, the point is to display products on the site according to vendors with the highest completed orders
    async updateCompleted(_, {
        id
    }, {
        pool,
        req
    }) {
        verifyJwt(req)

        try {
            //fetch a vendor's completed orders
            const completed_orders = await pool.query(`select o.order_id from orders o inner join order_status os on o.order_id = os.order_id where os.delivered = $2 and prod_creator_id= $1`, [id, 'true'])
            //get the length
            let completed_orders_length = completed_orders.rows.length
            //update users table with the length
            await pool.query(`update users set completed_qty = $2 where id = $1`, [id, completed_orders_length])
        } catch (err) {
            throw new Error(err.message)
        }
    },


    // To set pending to true after reviewing a vendor's profile or false. also set them offline
    async setUserStatus(_, {
        id,
        pending
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        //set online to 'true' when setting pending as 'false' and vice versa
        let online = pending === "true" ? "false" : "true"

        try {
            await pool.query(`update users set pending = $2, online = $3 where id = $1`, [id, pending, online])

            return {
                message: "User successfully updated"
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }


}