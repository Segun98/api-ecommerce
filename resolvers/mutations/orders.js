//@ts-check
const {
    verifyJwt
} = require("../../helpers/auth/middlewares")


module.exports = {
    /**
    @param{any}_,
    @param{{order_id:string,name: String,price: number, quantity: number,subtotal: number,request:String,customer_email: String,vendor_email: String,customer_phone: String,vendor_phone: String,customer_address: String,business_address: String,product_id: string,customer_id: string,prod_creator_id: string}} obj
    */
    async createOrder(_, {
        order_id,
        name,
        price,
        quantity,
        subtotal,
        request,
        customer_email,
        vendor_email,
        customer_phone,
        vendor_phone,
        customer_address,
        business_address,
        product_id,
        prod_creator_id,
    }, {
        pool,
        req
    }) {
        verifyJwt(req)

        try {
            await pool.query(`insert into orders (
                order_id,
                 name,
            price,
            quantity,
            subtotal,
            request,
            customer_email,
            vendor_email,
            customer_phone,
            vendor_phone,
            customer_address,
            business_address,
            product_id,
            prod_creator_id,
            customer_id
            ) values($1,$2,$3,$4,$5,$6,$7, $8,$9,$10,$11,$12,$13,$14,$15)`,
                [order_id,
                    name,
                    price,
                    quantity,
                    subtotal,
                    request,
                    customer_email,
                    vendor_email,
                    customer_phone,
                    vendor_phone,
                    customer_address,
                    business_address,
                    product_id,
                    prod_creator_id,
                    req.payload.user_id
                ])
            return {
                message: "Order has been placed!"
            }
        } catch (err) {
            throw new Error(err.message)
        }


    },


    //create order_status table after successful payment for order
    async updateOrder(_, {
        order_id,
        transaction_id,
        delivery_fee,
        total_price
    }, {
        pool,
        req
    }) {
        verifyJwt(req)
        try {

            await pool.query(`insert into order_status (order_id, transaction_id, delivery_fee, total_price) values($1,$2,$3,$4)`, [order_id, transaction_id, delivery_fee, total_price])
            return {
                message: "payment successful!"
            }
        } catch (err) {
            throw new Error(err.message)
        }

    },


    //by customer
    async cancelOrder(_, {
        order_id,
        canceled_reason
    }, {
        pool,
        req
    }) {
        verifyJwt(req)

        /* ensures you cant cancel an order on its way.
     I spent hours debugging this. Apparently Nodejs treats the in_transit value as a BOOLEAN. It is set as a STRING in my database and GRAPHQL type definition
 */
        const in_transit = await pool.query(`select in_transit from order_status where order_id = $1`, [order_id])
        in_transit.rows.forEach(a => {
            if (a.in_transit) {
                throw new Error("Can't Cancel, Your Order is On its Way!")
            }
        })

        const {
            role_id
        } = req.payload

        if (role_id !== "customer") {
            throw new Error("Unauthorised, you are not a customer")
        }
        try {
            await pool.query(`update order_status set canceled=$2, canceled_reason= $3 where order_id = $1`, [order_id, 'true', canceled_reason])

            return {
                message: "Order successfully canceled"
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },


}