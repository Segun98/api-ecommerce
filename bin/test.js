const pool = require("../db")
//reduce product quantity when a customer orders a product
async function updateQuantity() {
    try {
        //available quantity in stock
        const old_qty = await pool.query(`select available_qty from products where id = $1`, ['4dcb7c3b-6b80-4d06-a108-844ad288b4bd'])
        // // available qty minus quantity ordered
        const updated_qty = old_qty.rows[0].available_qty - 2

        await pool.query(`update products set available_qty = $2 where id = $1`, ['4dcb7c3b-6b80-4d06-a108-844ad288b4bd', updated_qty])

        // return {
        //     message: "Quantity updated"
        // }

    } catch (err) {
        console.log(err.message);
        // throw new Error(err.message)
    }

}