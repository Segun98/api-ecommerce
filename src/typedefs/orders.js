const {
    gql
} = require('apollo-server-express');

module.exports = gql `

type orders{
    id: ID,
    order_id:ID,
    name: String,
    price: Int,
    quantity: Int,
    delivery_fee: Int,
    subtotal: Int,
    description: String,
    accepted:String,
    completed: String,
    canceled: String,
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
    created_at: String
}
  `;