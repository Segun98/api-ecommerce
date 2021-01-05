const {
    gql
} = require('apollo-server-express');

module.exports = gql `

type orders{
    order_id:ID,
    name: String,
    price: Int,
    quantity: Int,
    subtotal: Int,
    request:String,
    customer_email: String,
    vendor_email: String,
    customer_phone: String,
    vendor_phone: String,
    customer_address: String,
    business_address: String,
    product_id: ID,
    customer_id: ID,
    prod_creator_id: ID,
    created_at: String,
    # nested
    orderStatus:order_status
}

type order_status {
    id:ID,
    order_id:ID,
    transaction_id:ID,
    delivery_fee:Int,
    total_price:Int,
    delivered:String,
    in_transit:String,
    canceled:String,
    canceled_reason:String,
    refund:String,
    paid:String,
    delivery_date:String
}

   type idRes{
          id: ID
        }
  `;