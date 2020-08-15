const verifyJwt = require("../../helpers/auth/middlewares")

async function createOrder(_, {
    name,
    price,
    quantity,
    delivery_fee,
    subtotal,
    description,
    customer_email,
    vendor_email,
    customer_phone,
    vendor_phone,
    customer_address,
    business_address,
    product_id,
    customer_id,
    prod_creator_id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    if (req.payload.user_id !== customer_id) {
        throw new Error("unauthorised, wrong customer")
    }
    try {
        await pool.query(`insert into orders ( name,
            price,
            quantity,
            delivery_fee,
            subtotal,
            description,
            customer_email,
            vendor_email,
            customer_phone,
            vendor_phone,
            customer_address,
            business_address,
            product_id,
            customer_id,
            prod_creator_id) values($1,$2,$3,$4,$5,$6,$7, $8,$9,$10,$11,$12,$13,$14,$15)`,
            [name,
                price,
                quantity,
                delivery_fee,
                subtotal,
                description,
                customer_email,
                vendor_email,
                customer_phone,
                vendor_phone,
                customer_address,
                business_address,
                product_id,
                customer_id,
                prod_creator_id
            ])

        return {
            message: "your order has been made, manage your orders on the order page"
        }
    } catch (err) {
        throw new Error(err.message)
    }


}

//both customer (maybe i shouldn't give them this power) and vendor
async function cancelOrder(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)

    try {
        await pool.query(`update orders set canceled = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been canceled"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

async function completeOrder(_, {
    id
}, {
    pool,
    req
}) {
    verifyJwt(req)
    if (req.payload.role_id !== 'vendor' || 'admin') {
        throw new Error("unauthorised")
    }
    try {
        await pool.query(`update orders set completed = $2 where id = $1`, [id, 'true'])
        return {
            message: "Order has been completed"
        }
    } catch (err) {
        throw new Error(err.message)
    }
}




module.exports = {
    createOrder,
    cancelOrder,
    completeOrder
}