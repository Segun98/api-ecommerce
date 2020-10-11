//@ts-check
const {
    verifyJwt
} = require("../../helpers/auth/middlewares")

/**
@param{any}_,
@param{{name:string, price:number, quantity:number, delivery_fee:number, subtotal:number, request:string,customer_email:string, vendor_email:string, customer_phone:string, vendor_phone:string, customer_address:string,business_address:string, product_id:string, prod_creator_id:string}} obj
*/

async function createOrder(_, {
    name,
    price,
    quantity,
    delivery_fee,
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
        await pool.query(`insert into orders ( name,
            price,
            quantity,
            delivery_fee,
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
            [name,
                price,
                quantity,
                delivery_fee,
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
            message: "Your order has been made, manage your orders on the order page"
        }
    } catch (err) {
        throw new Error(err.message)
    }


}

//both customer and vendor can cancel an Order
async function cancelOrder(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    /* ensures you cant cancel an ACCEPTED order.
     I spent hours debugging this. Apparently Nodejs treats the accepted value as a BOOLEAN. It is set as a STRING in my database and GRAPHQL type definition
 */
    const accepted = await pool.query(`select accepted from orders where id = $1`, [id])
    accepted.rows.forEach(a => {
        if (a.accepted) {
            throw new Error("Can't Cancel, Order Has Been Accepted")
        }
    })

    try {
        await pool.query(`update orders set canceled = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been canceled"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

//vendor only
async function acceptOrder(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== "vendor") {
        throw new Error("Unauthorised")
    }
    try {
        await pool.query(`update orders set accepted = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been accepted"
        }
    } catch (err) {
        throw new Error(err.message)
    }

}




module.exports = {
    createOrder,
    cancelOrder,
    acceptOrder
}